import { Button, Form, Input, InputNumber } from "antd";
import api from "../../https/api";

const ProfilePage = (user) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 6,
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
      console.log(user.user.user._id ,"user data");
      const onFinish = async(values) => {
        const id = user.user.user._id;
        console.log(values.user, "add user data");
        try{
                const res = await api.post(`app/v1/auth/updateUser/${id}`, {
                        designation: values.user.designation,
                        email: values.user.email,
                        contactNumber: values.user.contact,
                        userId: values.user.userId,
                        password: values.user.password,
                        firstLogin: false,
                    });
                    if(res.status === 200){
                            console.log("success")
                            alert("Profile Updated Successfully")
                            form.resetFields();                
                        }
                    }
                    catch(err){
                            console.log(err)
                        }
      };
    return (
        <div style={{marginLeft:'12%'}}>
              <Form
            form={form}
                {...layout}
                name="nest-messages"
                fields={[
                    {
                      name: ['user','department'],
                      value: user.user.user.department.name,
                    },
                    {
                        name: ['user','name'],
                        value: user.user.user.name,
                    },
                    {
                        name: ['user','email'],
                        value: user.user.user.email,
                    },
                    {
                        name: ['user','contact'],
                        value: user.user.user.contactNumber,
                    },
                    {
                        name: ['user','userId'],
                        value: user.user.user.userId,
                    },
                    {
                        name: ['user','designation'],
                        value: user.user.user.designation,
                    }
                  ]}
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name={['user', 'name']}
                    label="Name"
                    
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name={['user', 'designation']}
                    label="Designation"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'password']}
                    label="New Password"
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name={['user', 'userId']}
                    label="User Id"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={['user', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
               
                <Form.Item name={['user', 'contact']}
                    rules={[
                        {
                            type: 'number',
                        },
                    
                    ]}
                label="Contact Number">
                    <InputNumber style={{width:'100%'}} />
                </Form.Item>
                <Form.Item name={['user', 'department']} label="Department">
                    <Input disabled  />
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

export default ProfilePage;