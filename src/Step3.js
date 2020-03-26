import React, {
	useState,
	useEffect
} from 'react'
import {
	Form,
	Input,
	Spin,
	Button,
} from 'antd'
import {
	useHistory
} from 'react-router-dom'


const formatArea = arr => {
	arr.forEach(item => {
		if (item.child) {
			item.children = formatArea(item.child.options)
			delete item.child
		}
	})
	return arr
}

const VertButton = ({ phone, form }) => {
	const [count, setCount] = useState(0)
	const [loading, setLoading] = useState(false)
	const { validateFields } = form

	const handleClick = () => {
		validateFields(['admin_phone'])
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
			setCount(6)
		}, 2000)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (count > 0) {
				setCount(c => c - 1)
			}
		}, 1000)
		return () => {
			clearTimeout(timer)
		};
	}, [count]);

	return (
		<Button
			type="primary"
			loading={loading}
			disabled={count}
			style={{width: 102}}
			onClick={handleClick}
		>{!loading && (count || '发送验证码')}</Button>
	)
}

const Step3 = () => {
	const history = useHistory()
	const [form] = Form.useForm()
	const [loading, setLoading] = useState(false)
	const [phone, setPhone] = useState()

	const handleSubmit = value => {
		setLoading(true)
		setTimeout(() => {
			setLoading(false)
		}, 2000)
	}

	const handleCancel = () => {
		history.push('/')
	}

	return (
		<Form
			name="query"
			className="step"
			form={form}
			onFinish={handleSubmit}
			labelCol={{span:9}}
			wrapperCol={{span:7}}
		>
			<Spin spinning={loading}>
				<Form.Item
					label="手机号码"
					required
				>
					<Input.Group compact>
						<Form.Item name="phone"
							noStyle
							validateTrigger='onBlur'
							rules={[{
								required: true,
								message: '请输入正确的手机号',
								pattern: /^1[3456789]\d{9}$/,
							}]}
						>
							<Input autoComplete="off"
								style={{width: 'calc(100% - 102px)'}}
								placeholder="请填写手机号并确保不重复，该手机号为登录账号"
								onChange={e => setPhone(e.target.value)}
							/>
						</Form.Item>
						<VertButton phone={phone} form={form} />
					</Input.Group>
				</Form.Item>
				<Form.Item name="code" label="短信验证码"
					rules={[{ required: true, message: '请填写短信验证码！' }]}
				>
					<Input autoComplete="off" placeholder="请填写管理员短信验证码"/>
				</Form.Item>
			</Spin>
			<div className="btns">
				<Button
					type="primary"
					htmlType="submit"
					loading={loading}
				>下一步</Button>
				<Button onClick={handleCancel}>取消</Button>
			</div>
		</Form>
	)
}

export default Step3
