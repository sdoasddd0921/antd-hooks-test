import React, {
	useState,
	useEffect,
	useCallback
} from 'react'
import {
	Form,
	Input,
	Spin,
	Button,
	message
} from 'antd'
import {
	CheckCircleFilled,
	CloseCircleFilled
} from '@ant-design/icons'

const icon = success => {
	const style = {
		color: success ? '#4eab6d' : '#d6443b',
		position: 'absolute',
		left: '100%',
		marginLeft: '10px',
		fontSize: 22,
		lineHeight: '38px'
	}
	const Icon = success ? CheckCircleFilled : CloseCircleFilled
	return (
		<Icon style={style} />
	)
}

const Step2 = ({ projectId }) => {
	const [form] = Form.useForm()
	const { validateFields, setFieldsValue } = form
	const [loading, setLoading] = useState(false)
	const [state, setState] = useState({
		mp: [{}],
		mini: [{}]
	})
	console.log('aaaaaaaa', state)

	const link = {
		xcx: '',
		fwh: ''
	}
	const getTemplate = useCallback(() => {
		// setLoading(true)
		const check = arr => {
			if (!Array.isArray(arr) || arr.length < 1) {
				return [{}]
			}
			return arr
		}
		const delay = () => new Promise(res => setTimeout(res, 1300))
		const test = async () => {
			await delay()
			const data = {mini: [], mp: []}
			let {mini = [], mp = []} = data
			mini = check(mini)
			mp = check(mp)
			console.log('cccccc')
			setState((s) => {
				console.log('in setState',s)
				return {mini, mp}
			})
			console.log('ddddddddddd')
		}
		test()
	}, [projectId, validateFields, setFieldsValue])

	const handleSubmit = value => {
		setLoading(true)
	}

	const handleCancel = () => {
		const a = ({
			mini: [{}],
			mp: [{}]
		})
		setState(a)
		setFieldsValue(a)
	}

	const handleJump = (type) => {
		window.open(link[type])
	}

	useEffect(() => {
		console.log('bbbbbbbbbb')
		getTemplate()
		return () => console.log('clean up')
	}, [getTemplate])
	useEffect(() => {
		validateFields()
	}, [state])

	const Btn = () => {
		return <Button onClick={() => {
			const a = ({
				mini:[{id: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeee'}],
				// mp: [{id: '1'}],
				mp: [{}]
			})
			setState(a)
			setFieldsValue(a)
		}}>test</Button>
	}

	return (
		<Form
			name="query"
			className="step-4"
			form={form}
			onFinish={handleSubmit}
			labelCol={{span:6}}
			wrapperCol={{span:11}}
		>
			<Spin spinning={loading}>
				<p className="l-title">some good things</p>
				{
					state.mini.map((xcx, index) => {
						return (
							<Form.Item key={xcx.id + 'xcx'} label="starting ID" required>
								<div>
									<Form.Item noStyle name={['mini', index, 'id']}
										rules={[{
											required: true,
											message: <span>
												<span>
													no scan IDs
												</span>
												<Button type='link' onClick={
													() => handleJump('xcx')}
												>立刻前往</Button>
											</span>
										}]}
									>
										<Input autoComplete="off" disabled/>
									</Form.Item>
									{icon(xcx.id)}
								</div>
							</Form.Item>
						)
					})
				}
				<p className="l-title">something configs</p>
				{
					state.mp.map((fwh, index) => {
						return (
							<Form.Item key={fwh.id + 'fwh'} label="客户跟进提醒ID" required>
								<div>
									<Form.Item noStyle name={['mp', index, 'id']}
										rules={[{
											required: true,
											message: <span>
												<span>
													tips tips tips tips tips tips tips tips tips tips
												</span>
												<Button type='link' onClick={
													() => handleJump('xcx')}
												>立刻前往</Button>
											</span>
										}]}
									>
										<Input autoComplete="off" disabled/>
									</Form.Item>
									{icon(fwh.id)}
								</div>
							</Form.Item>
						)
					})
				}
			</Spin>
			<div className="btns" style={{marginTop: 30}}>
				<Btn />
				<Button onClick={handleCancel}>取消</Button>
			</div>
		</Form>
	)
}

export default Step2
