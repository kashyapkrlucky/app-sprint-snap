// api.js (mock)
export const getProfile = async () => {
    return {
        fullName: 'John Doe',
        avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    };
};

export const getTasks = async () => [
    { title: 'Design Sprint Plan', description: 'Complete the design plan for Sprint 5.' },
    { title: 'Fix Bug #123', description: 'Resolve the authentication issue in the login page.' },
];

export const getProjects = async () => [
    { name: 'Project A', description: 'Development of new feature for application.' },
    { name: 'Project B', description: 'Marketing campaign for new product.' },
];

export const getTeam = async () => [
    { fullName: 'Jane Smith', avatarUrl: 'https://randomuser.me/api/portraits/women/32.jpg', role: 'Designer' },
    { fullName: 'Bob Johnson', avatarUrl: 'https://randomuser.me/api/portraits/men/43.jpg', role: 'Developer' },
];
