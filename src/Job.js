import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function CreateJob() {
    const [jobData, setJobData] = useState({
        startDay: '2023-06-26',
        endDay: '2023-06-30',
        startTime: '03:00:00',
        endTime: '04:30:00',
        hourlyRate: '150$',
        professionalID: '64ad406c075804f77a3e7895',
        status: 'pending'
    });

    const handleChange = e => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/jobs/64ac2209ac37f55713af3016', jobData);
            console.log(res.data);
            // Убедитесь, что clientID, professionalID и _id (jobId) доступны в ответе
            if (res.data && res.data.clientID && res.data.professionalID && res.data._id) {
                navigate(`/chat/${res.data.clientID}/${res.data.professionalID}/${res.data._id}`);
            } else {
                console.error('clientID, professionalID or jobId is missing in the response');
            }

        } catch (error) {
            console.error(error);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <input type="date" name="startDay" onChange={handleChange} />
            <input type="date" name="endDay" onChange={handleChange} />
            <input type="text" name="startTime" onChange={handleChange} />
            <input type="text" name="endTime" onChange={handleChange} />
            <input type="text" name="hourlyRate" onChange={handleChange} />
            <input type="text" name="professionalID" onChange={handleChange} />
            <input type="text" name="clientID" onChange={handleChange} />
            <input type="text" name="status" onChange={handleChange} />
            <button type="submit">Create Job</button>
        </form>
    );
}

export default CreateJob;
