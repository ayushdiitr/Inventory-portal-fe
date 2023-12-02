import { Button, Form, Input, InputNumber } from 'antd';
import { useSelector } from 'react-redux';
import api from '../../https/api';

const AddLab = () => {
    const user  = useSelector(state => state.user.user)
    const department = user.user.department.name;
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    
    const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      /* eslint-enable no-template-curly-in-string */
      
      const onFinish = async(values) => {
        console.log(values.lab, "add lab data");
        try{
                const res = await api.post("app/v1/lab/addLab", {
                        name: values.lab.name,
                        email: values.lab.email,
                        contactNumber: values.lab.contact,
                        department: values.lab.department,
                    });
                    if(res.status === 201){
                            console.log("success")
                            alert("Lab Added Successfully")
                            form.resetFields();                
                        }
                    }
                    catch(err){
                            console.log(err)
                        }
      };
    
    return (
        <div style={{marginLeft: '12%'}}>
            <Form
            form={form}
                {...layout}
                name="nest-messages"
                fields={[
                    {
                      name: ['lab','department'],
                      value: department,
                    },
                  ]}
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['lab', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['lab', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
               
                <Form.Item name={['lab', 'contact']}
                    rules={[
                        {
                            type: 'number',
                        },
                    
                    ]}
                label="Contact Number">
                    <InputNumber style={{width:'100%'}} />
                </Form.Item>
                <Form.Item name={['lab', 'department']} valuePropName={department} label="Department">
                    <Input disabled value={department} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddLab;