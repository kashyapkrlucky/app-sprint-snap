// pages/HomePage.js
import React, { useEffect, useState } from 'react';
import Banner from '../components/Home/Banner';
import TaskList from '../components/Home/TaskList';
import ProjectList from '../components/Home/ProjectList';
import Team from '../components/Home/Team';
import { getProfile, getTasks, getProjects, getTeam } from '../shared/Data'; // Replace with actual data fetching
import Layout from '../components/Layout';
import TopBar from '../components/Layout/TopBar';

const HomePage = () => {
    const [user, setUser] = useState({
        fullName: 'John Doe',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    });
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [team, setTeam] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            const userProfile = await getProfile(); // Fetch user profile
            const userTasks = await getTasks(); // Fetch tasks
            const userProjects = await getProjects(); // Fetch projects
            const userTeam = await getTeam(); // Fetch team members

            setUser(userProfile);
            setTasks(userTasks);
            setProjects(userProjects);
            setTeam(userTeam);
        };

        fetchData();
    }, []);

    if (!user) return <div>Loading...</div>; // Add loading state

    return (
        <Layout>
            <div className='flex flex-col gap-4 w-full px-4 flex flex-col gap-4'>
                <Banner user={user} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div>
                        <TaskList tasks={tasks} />
                    </div>
                    <div>
                        <ProjectList projects={projects} />
                    </div>
                    <div>
                        <Team team={team} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
