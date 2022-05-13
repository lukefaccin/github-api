import { Octokit } from "octokit";
import fs from 'fs';

const octokit = new Octokit({
    auth: process.env.GITHUB_SECRET,
});
export default octokit;

export function readData() {
    // Processes the output of github cli to gather insights for statistical analysis.
    const fs = require("fs");
    const data = fs.readFileSync("./output/data.json", "utf8");
    return JSON.parse(data);
}

export function writeCsvArray(timeArray: number[]) {
    var row = ""
    for (const item of timeArray){
        row += `${item},`
    }
    row += "\n"
    fs.appendFile('./output/output.csv', row, (err: any) => {
        if(err) {
            console.log(err);
        }
    })
}

export function timeDiffCalc(timeInMs: number) {
    const minutes = timeToMins(timeInMs)
    const hours = timeToHours(minutes)
    const days = timeToDays(hours)

    const timeArray = [minutes,hours,days]
    return timeArray
}

export function timeToMins(timeInMs: number) {
    const seconds = timeInMs / 1000
    const minutes = seconds / 60
    return minutes
}

export function timeToHours(timeInMins: number) {
    const hours = timeInMins / 60
    return hours
}

export function timeToDays(timeInHours: number) {
    const days = timeInHours / 24
    return days
}