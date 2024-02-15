import { AxiosResponse } from "axios";
import { HttpRequestType } from "@/core";
import { endPoints } from "@/configs";
import Request from "./request";


const services = {

   addUserToColor(data: object) {
      return new Promise((resolve, reject) => {
         new Request()
            .append(endPoints.colorUser)
            .method(HttpRequestType.POST)
            .setData(data)
            .then(async (response: AxiosResponse) => {
               resolve(response.data);
            })
            .catch((error) => {
               reject(error);
            });
      });
   },

};

export default services;
