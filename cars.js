import database from "./database.js";

export default class cars extends database {
    constructor(){
        // create database
        parent = super("cars","car");
    }
    insert = (car) => {
        // insert new car
        if(typeof car === "object"){
            if(car.brand !== undefined && car.model !== undefined && car.year !== undefined){
                this.insertDB(car);
            }
            else{
                console.error("Car object error");
            }
        }
        else{
            console.error("Car object is not object");
        }
    }

    delete = (key) => {
        // delete exiting car
        if(parseInt(key) > 0){
            this.deleteDB(key);
        }
        else{
            console.error("Car key error");
        }
    }

    update = async (key,car) => {
        // update exiting car
        if(parseInt(key) > 0){
            if(typeof car === "object"){
                if(car.brand !== undefined && car.model !== undefined && car.year !== undefined){
                    const data = await this.updateDB(key,car);
                    return data;
                }
                else{
                    console.error("Car object error");
                }
            }
            else{
                console.error("Car object is not object");
            }
        }
        else{
            console.error("Car key error");
        }
    }

    getSingle = async (key) => {
        // get single car
        if(parseInt(key) > 0){
            const data = await this.getSingleDB(key);
            return data;
        }
        else{
            console.error("Car key error");
        }
    }

    getList = async () => {
        // get all cars
        const data = await this.getListDB();
        return data;
    }
}