import "./Home.scss";

type TitleProps = {
	title: string;
	children?: string;
};

export const Title = ({ title = "" }: TitleProps) => <h1>{title}</h1>;

export function Home() {
	return (
		<div className="main">
			<Title title="The project management software that will actually work for your team" />
			<h3>Manage simple to complex projects and everything in between with Elefant</h3>
			<img src="../../img/elefant.svg" alt="elefant" />
			<div className="welcome-page">
				<img src={require("../../img/Julia.jpg")} alt="Julia" />
				<img src={require("../../img/Maria.jpg")} alt="Maria" />
				<img src={require("../../img/Lena.jpg")} alt="Olena" />
			</div>
		</div>
	);
}
