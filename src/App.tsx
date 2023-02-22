import { useState } from "react"
import AvatarPlaceholder from "./assets/avatar_placeholder.jpg"
import SendIcon from "./assets/send-icon.svg"
import Contacts from "./components/Contacts"
import { IUser } from "./types/api"

export default function App() {
	const [username, setUsername] = useState("")
	const [user, setUser] = useState<IUser | null>(null)
	const [error, setError] = useState<Error | null>(null)

	async function getUser() {
		try {
			const res = await fetch(`https://api.github.com/users/${username}`)

			if (!res.ok) throw new Error(`HTTP error ${res.status}`)

			const json = await res.json()

			setUser(json)
			setError(null)
		} catch (error) {
			if (error instanceof Error) {
				setError(error)
				setUser(null)
			}
			console.error(error)
		}

		setUsername("")
	}

	return (
		<div className="min-h-screen w-full bg-black p-4 flex justify-center items-center relative z-10 overflow-hidden before:absolute before:h-64 before:w-64 before:bg-gradient-to-br before:from-purple-700 before:to-sky-600 before:rounded-full before:-z-10 before:translate-x-48 before:-translate-y-32 after:absolute after:h-48 after:w-48 after:bg-gradient-to-br after:from-rose-700 after:to-amber-600 after:rounded-full after:-z-10 after:-translate-x-48 after:translate-y-32">
			<div className="max-w-sm w-full backdrop-blur-sm flex flex-col">
				<div className="w-full h-36 bg-neutral-700 bg-opacity-40 rounded-t"></div>
				<div className="w-full bg-neutral-700 bg-opacity-30 rounded-b flex flex-col items-center px-6 pb-6">
					<img
						src={user ? user.avatar_url : AvatarPlaceholder}
						alt={`${user?.login} avatar`}
						className="w-28 h-28 rounded-full -mt-20"
					/>
					<p className="mt-4 font-semibold text-lg text-white text-center">
						{user?.name ?? user?.login}
					</p>
					<p className="text-neutral-500 text-center">
						{user?.bio ?? user?.location ?? user?.login}
					</p>
					<div className="w-full mt-8 flex">
						<div className="text-center flex-1">
							<p className="font-semibold text-lg text-white">
								{user?.followers ?? "-"}
							</p>
							<p className="text-neutral-300 text-sm">
								Followers
							</p>
						</div>
						<div className="text-center flex-1">
							<p className="font-semibold text-lg text-white">
								{user?.following ?? "-"}
							</p>
							<p className="text-neutral-300 text-sm">
								Following
							</p>
						</div>
						<div className="text-center flex-1">
							<p className="font-semibold text-lg text-white">
								{user?.public_repos ?? "-"}
							</p>
							<p className="text-neutral-300 text-sm">
								Repositories
							</p>
						</div>
					</div>
				</div>
				<form
					className="relative mt-4"
					onSubmit={(e) => {
						e.preventDefault()
						getUser()
					}}
				>
					<input
						type="text"
						placeholder="Usuário do Github"
						className="w-full h-12 bg-neutral-700 bg-opacity-40 px-3 text-white outline-0 rounded border-b-2 border-b-transparent transition-colors focus:border-b-purple-700"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value)
						}}
					/>
					<button
						type="submit"
						className="h-12 w-12 absolute top-0 right-0 bg-gradient-to-br from-purple-700 to-sky-600 rounded-r hover:opacity-80"
					>
						<img
							src={SendIcon}
							alt=""
							className="h-6 w-6 inline-block"
						/>
					</button>
				</form>
			</div>
			<Contacts />
		</div>
	)
}
