class database {
    constructor(dbName, tableName) {
        // create database
        const request = indexedDB.open(dbName, 1);

        request.onerror = (event) => {
            console.error(`Database Error : ${event.target.errorCode}`);
        }

        request.onsuccess = (event) => {
            this.db = event.target.result;
        }

        request.onupgradeneeded = (event) => {

            const db = event.target.result;
            const objectStore = db.createObjectStore(tableName, { autoIncrement: true }); // craete table

            // creating mock data
            const volvo = { brand: "volvo", model: "xc 90", year: "2020" }; // add test data
            objectStore.add(volvo);

        }
    }

    insertDB = (car) => {
        // insert new car
        const request = indexedDB.open("cars", 1);
        request.onsuccess = (event) => {
            var db = event.target.result;
            const transaction = db.transaction(["car"], "readwrite");

            const objectStore = transaction.objectStore("car");
            const requestO = objectStore.add(car);

            requestO.onsuccess = (event) => {
                console.log("insert successful");
            };
        }
    }

    deleteDB = (key) => {
        // delete exiting car
        const request = indexedDB.open("cars", 1);
        request.onsuccess = (event) => {
            var db = event.target.result;
            const requestO = db.transaction(["car"], "readwrite").objectStore("car").delete(key);

            requestO.onsuccess = (event) => {
                console.log("delete successful");
            };
        }
    }

    updateDB = (key,car) => {
        // update exiting car
        const request = indexedDB.open("cars", 1);
        request.onsuccess = (event) => {
            var db = event.target.result;
            const objectStore = db.transaction(["car"], "readwrite").objectStore("car");
            const requestO = objectStore.get(key);

            requestO.onsuccess = (event) => {
                const data = event.target.result;
                data.brand = car.brand;
                data.model = car.model;
                data.year = car.year;
                
                const requestUpdate = objectStore.put(data,key);

                requestUpdate.onsuccess = (event) => {
                    console.log("update successful");
                };
            };
        }
    }

    getSingleDB = async (key) => {
        // get single car
        var returnData = new Promise(function(resolve, reject) {
            const request = indexedDB.open("cars", 1);
            request.onsuccess = (event) => {
                var db = event.target.result;
                const objectStore = db.transaction(["car"], "readwrite").objectStore("car");
                
                const requestO = objectStore.get(key);

                var returnData2 = new Promise(function(resolve, reject) {
                    requestO.onsuccess = (event) =>{
                        const data = event.target.result;
                        resolve(data);
                    }
                })
                returnData2.then(function(data){
                    resolve(data);
                });
                
            }
        });
        return returnData.then(data => data);

    }

    getListDB = async () => {
        // get all cars
        var returnData = new Promise(function(resolve, reject) {
            const request = indexedDB.open("cars", 1);
            request.onsuccess = (event) => {
                var db = event.target.result;
                const objectStore = db.transaction(["car"], "readwrite").objectStore("car");
                
                const requestO = objectStore.openCursor(); // getAll alternative
                
                var returnData2 = new Promise(function(resolve, reject) {
                    const returnArray = [];

                    requestO.onsuccess = (event) =>{
                        const cursor = event.target.result;
                        if(cursor){

                            var carObj = {key : cursor.key, value : cursor.value}
                            returnArray.push(carObj);

                            cursor.continue();
                        }
                        else{
                            resolve(returnArray);
                        }
                    }
                })
                returnData2.then(function(data){
                    resolve(data);
                });
                
            }
        });
        return returnData.then(data => data);

    }

}

export default database;