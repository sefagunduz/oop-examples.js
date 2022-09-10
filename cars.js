import database from "./database.js";

export default class cars extends database {
    constructor(){
        // create database
        parent = super("cars","car");
    }
    insert = (car) => {
        // insert new car
        this.insertDB(car);
    }

    delete = (key) => {
        // delete exiting car
        this.deleteDB(key);
    }

    update = (key,car) => {
        // update exiting car
        this.updateDB(key,car);
    }

    getSingle = async (key) => {
        // get single car
        const data = await this.getSingleDB(key);
        return data;
    }

    getList = async () => {
        // get all cars
        const data = await this.getListDB();
        return data;
    }
}