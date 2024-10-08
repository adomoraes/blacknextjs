// pages/static.tsx

import { GetStaticProps, NextPage } from "next"
import { ReactNode, useEffect, useState } from "react"
import { Col, Container, Row } from "reactstrap"

type ApiResponse = {
	name: string
	timestamp: Date
}

export const getStaticProps: GetStaticProps = async () => {
	const staticData = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/hello`
	).then((res) => res.json())

	return {
		props: {
			staticData,
		},
		revalidate: 10,
	}
}

const Static: NextPage = (props: {
	children?: ReactNode
	staticData?: ApiResponse
}) => {
	const [clientSideData, setClientSideData] = useState<ApiResponse>()

	useEffect(() => {
		fetchData()
	}, [])

	const fetchData = async () => {
		const data = await fetch(`/api/hello`).then((res) => res.json())
		setClientSideData(data)
	}

	return (
		<Container tag='main'>
			<h1 className='my-5'>Como funcionam as renderizações do Next.js</h1>

			<Row>
				<Col>
					<h3>Gerado estaticamente durante o build:</h3>
					<h4>{props.staticData?.timestamp.toString()}</h4>
				</Col>

				<Col>
					<h3>Gerado no cliente: </h3>
					<h4>{clientSideData?.timestamp.toString()}</h4>
				</Col>
			</Row>
		</Container>
	)
}

export default Static
