import React, { useState } from 'react'
import Button from './Button';
import Input from './Input';
import Modal from './Modal';

import Card from './Card';
import Form from './Form';

import Alert from './Alert';
import Avatar from './Avatar';
import Dropdown from './Dropdown';
import Badge from './Badge';
import Pagination from './Pagination';
import Tooltip from './Tooltip';
import Tabs from './Tabs';

import Wizard from './Wizard';

import Accordion from './Accordion';
import DataTable from './DataTable';
import ThemeSwitcher from '../components/Layout/ThemeSwitcher';


function Examples() {

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };
    const tabs = [
        { id: 'tab1', label: 'Tab 1', content: <div>Content for Tab 1</div> },
        { id: 'tab2', label: 'Tab 2', content: <div>Content for Tab 2</div> },
    ];

    const steps = [
        { content: <div>Step 1: User Information</div> },
        { content: <div>Step 2: Address Details</div> },
        { content: <div>Step 3: Review and Submit</div> },
    ];
    const items = [
        { title: 'Section 1', content: <div>Content for Section 1</div> },
        { title: 'Section 2', content: <div>Content for Section 2</div> },
    ];


    const columns = ['Name', 'Age', 'Occupation'];
    const data = [
        { Name: 'John Doe', Age: 30, Occupation: 'Developer' },
        { Name: 'Jane Smith', Age: 25, Occupation: 'Designer' },
    ];

    return (
        <div className='p-8 flex flex-col gap-6'>
            <Button variant="primary" size="md" onClick={() => alert('Button Clicked!')}>
                Click Me
            </Button>

            <Input type="text" placeholder="Enter your name" size="md" />

            <Button onClick={openModal}>Open Modal</Button>
            <Modal isOpen={isModalOpen} closeModal={closeModal} title="Example Modal">
                <p>This is an example modal.</p>
            </Modal>


            <Card title="Card Title" footer={<Button variant="primary">Submit</Button>}>
                <p>Card content goes here.</p>
            </Card>


            <Form onSubmit={handleSubmit}>
                <Input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Button type="submit" variant="primary">Submit</Button>
            </Form>


            <Alert type="success" message="Your changes have been saved successfully!" />

            <Avatar imageUrl="https://cdn-icons-png.flaticon.com/512/9187/9187604.png" name="John Doe" size="md" />


            <Dropdown
                label="Actions"
                options={['Edit', 'Delete', 'Share']}
                onSelect={(option) => console.log(`Selected ${option}`)}
            />


            <Badge variant="success">Active</Badge>
            <Badge variant="danger">Pending</Badge>

            <Pagination currentPage={1} totalPages={5} onPageChange={(page) => console.log(`Navigate to page ${page}`)} />


            <Tooltip message="This is a tooltip">
                <Button>Hover over me</Button>
            </Tooltip>

            <Tabs tabs={tabs} />



            <Wizard steps={steps} />

            <Accordion items={items} />




            <DataTable columns={columns} data={data} />

            <ThemeSwitcher />
        </div>
    )
}

export default Examples