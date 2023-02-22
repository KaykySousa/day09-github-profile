import GithubIcon from "../assets/logo-github.svg"
import LinkedinIcon from "../assets/logo-linkedin.svg"

export default function Contacts() {
	return (
		<div className="fixed right-2 bottom-2 mt-4 flex gap-x-2">
			<a
				href="https://www.linkedin.com/in/kayky-de-sousa/"
				className="h-10 w-10 p-2 fill-white bg-blue-600 rounded-full block hover:bg-blue-700"
			>
				<img
					src={LinkedinIcon}
					className="w-full h-full"
					alt="Linkedin logo"
				/>
			</a>
			<a
				href="https://github.com/KaykySousa"
				className="h-10 w-10 p-2 fill-white bg-gray-800 rounded-full block hover:bg-gray-900"
			>
				<img
					src={GithubIcon}
					className="w-full h-full"
					alt="Github logo"
				/>
			</a>
		</div>
	)
}
