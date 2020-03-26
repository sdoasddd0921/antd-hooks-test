import React, { useState, useEffect } from 'react'
import {Button,Form,Input} from 'antd'

let id = 1

export default () => {
	const [list, setList] = useState([{id}])
	const add = () => {
		setList(list.concat([{id: ++id}]))
	}
	useEffect(() => {
		setList([{id:3}])
	}, [])
	return (
		<Form>
			{
				list.map((item, index) => {
					return (
						<Form.Item required label="test label" key={index}>
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
			<Button type="primary" onClick={add}>add list</Button>
		</Form>
	)
}