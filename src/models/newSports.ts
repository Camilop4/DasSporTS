import { ObjectId } from "mongodb";

export default class New {
  constructor(public name: string, public description: string, public category: string, public id?: ObjectId) {}
}
