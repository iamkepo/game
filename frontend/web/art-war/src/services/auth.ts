import { AxiosError, AxiosResponse } from "axios";
import { HttpRequestType } from "@/core";
import { endPoints } from "@/configs";
import Request from "./request";


const services = {
   async login(credentials: { email: string; password: string; }) {
      return new Promise((resolve, reject) => {
         new Request()
            .append(endPoints.login)
            .setData({
               email: credentials.email,
               password: credentials.password,
            })
            .method(HttpRequestType.POST)
            .then(async (response: AxiosResponse) => {
               resolve(response.data);
            })
            .catch((error: AxiosError) => {
               reject(error);
            });
      });
   },

   register(data: object) {
      return new Promise((resolve, reject) => {
         new Request()
            .append(endPoints.register)
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
   fetchCurrentUser() {
      return new Promise((resolve, reject) => {
         new Request()
            .append(endPoints.me)
            .method(HttpRequestType.GET)
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
