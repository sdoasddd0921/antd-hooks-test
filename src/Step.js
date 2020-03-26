import React, { useState, useEffect } from 'react'
import {Button,Form,Input} from 'antd'

let id = 1

export default ({history}) => {
	const [form] = Form.useForm()
	const [list, setList] = useState([{}])
	const add = () => {
		setList([{id: ++id}, {
			id: 'eeaasd'
		}])
	}
	useEffect(() => {
		setList([{id:3}])
	}, [])
	return (
		<Form form={form}>
			{
				list.map((item, index) => {
					return (
						<Form.Item required label="test label" key={index + 'xcx'}>
							<div>
								<Form.Item
									noStyle
									name={"itemname"+index}
									rules={[{
										required: true,
										message: '必须输入'
									}]}
								>
									<Input />
								</Form.Item>
								<span>id: {item.id}</span>
							</div>
						</Form.Item>
					)
				})
			}
			{/* <Button type="primary" onClick={add}>add list</Button> */}
			<Button type="primary" onClick={() => {
				history.push('/test')
			}}>jump</Button>
		</Form>
	)
}