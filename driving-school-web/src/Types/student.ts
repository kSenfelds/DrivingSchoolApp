export type Student = {
    id?: number;
    name: string;
    lastName: string;
    yearOfBirth: number;
    email: string;
    phoneNumber: string;
    address: string;
    city: string;
    trainingCategory: string;
    dateOfRegistration: Date;
    dateOfTheoryExam?: Date;
    dateOfDrivingExam?: Date;
    theoryMark?: number;
    drivingMark?: number;
}