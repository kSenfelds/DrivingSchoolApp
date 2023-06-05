import axios from "axios";
import { Student } from "../Types/student";


const BASE_URL = "https://localhost:7255/"

export const AddStudent = async (student: Student) => {
    try {
       const response = await axios.put(`${BASE_URL}registration`, student);
        return response.status;

    }catch(error){
        console.log(error)
    }
}

export const DeleteStudent = async (id: number) => {
    try {
        await axios.delete(`${BASE_URL}registration/?id=${id}`);
    }catch(error){
        console.log(error)
    }
}

export const EditMark = async (id: number, markTitle: ["theory" | "driving"], mark: number) => {
    try {
        await axios.post(`${BASE_URL}registration/mark?id=${id}&markTitle=${markTitle}&mark=${mark}`);
    }catch(error){
        console.log(error)
    }
}

export const SetExamDate = async (id: number, examTitle: ["theory" | "driving"], date: Date) => {
    try {
        const response = await axios.post(`${BASE_URL}registration/exam?id=${id}&examTitle=${examTitle}&date=${date.toISOString()}`);
        return response.status;
    }catch(error){
        console.log(error)
    }
}

export const GetAllStudents = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}registration`);
        return data;
    }catch(error){
        console.log(error)
    }
}
export const SendEmail = async (id: number, examTitle: ["theory" | "driving"]) => {
    try {
        const response = await axios.get(`${BASE_URL}registration/email?id=${id}&examTitle=${examTitle}`);
        return response.status;
    }catch(error){
        console.log(error)
    }
}