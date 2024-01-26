import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'

const Dashboard = ({ address }) => {
	const [twTokens, setTwTokens] = useState([])
	const [sanityTokens, setSanityTokens] = useState([])

	useEffect(() => {
		const getCoins = async () => {
			try {
				const coins = await fetch(
					'https://kir9f1ga.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D%7B%0A++name%2C%0A++++usdPrice%2C%0A++++contractAddress%2C%0A++++symbol%2C%0A++++logo%0A%7D'
				)
				const tempSanityTokens = await coins.json()

				setSanityTokens(tempSanityTokens.result)
			} catch (error) {
				console.error(error)
			}
		}

		return getCoins()
	}, [])

	useEffect(() => {
		if (sanityTokens) {
			const sdk = new ThirdwebSDK(
				new ethers.Wallet(
					process.env.NEXT_PUBLIC_METAMASK_KEY,
					ethers.getDefaultProvider('https://goerli.infura.io/v3/')
				)
			)

			sanityTokens.map(tokenItem => {
				const currentToken = sdk.getTokenModule(tokenItem.contractAddress)

				setTwTokens(prevState => [...prevState, currentToken])
			})
		}
	}, [sanityTokens])

	return (
		<Wrapper>
			<Sidebar />
			<MainContainer>
				<Header
					twTokens={twTokens}
					sanityTokens={sanityTokens}
					walletAddress={address}
				/>
				<Main
					twTokens={twTokens}
					sanityTokens={sanityTokens}
					walletAddress={address}
				/>
			</MainContainer>
		</Wrapper>
	)
}

export default Dashboard

export async function getServerSideProps(context) {}

const Wrapper = styled.div`
	display: flex;
	height: 100vh;
	width: 100vw;
	background-color: #0a0b0d;
	color: white;
	overflow: hidden;
`

const MainContainer = styled.div`
	flex: 1;
`
