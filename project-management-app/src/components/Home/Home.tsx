import elephant from '../../img/elephant.svg';
import "./Home.scss";

export const Elefant = () => {
  return ( <img className="elephant" src={elephant} alt="elephant" /> );
};

type TitleProps = {
	title: string;
	children?: string;
};

export const Title = ({ title = "" }: TitleProps) => <h1>{title}</h1>;

export function Home() {
	return (
		<div className="main">
			<Title title="Manage simple to complex projects and everything in between with Elefant" />
			<Elefant />
			<h2>The project management software that will actually work for your team</h2>
			<p className='welcome'>There’s an old quote by Creighton Abrams: “When eating an elephant, take one bite at a time.”  Clearly, no one is encouraging dining on these fantastic animals, but it’s good advice about how to tackle a huge, overwhelming project—like the climb to success. As Taoist philosopher Lao-Tzu says, “The journey of a thousand miles begins with a single step.”</p>
			<p className='welcome'>Understanding that is one of the keys to success. First, I set a goal...</p>
			<h2>Plan, execute, and track projects of any size</h2>
			<p className='welcome'>Easily assign tasks and prioritize what's most important to your team. Set project timeline, milestones and dependencies, and manage your team’s entire workload all in one place.</p>
			<h2>The platform your team will actually love to use</h2>
			<p className='welcome'>Collaborate seamlessly across teams and departments to gain visibility into the progress of your work. Keep everyone aligned with a platform they will enjoy using to ensure a smoother execution.</p>
			<h2>This app was made on the course React 2022 Q1 in <a href="https://rs.school" className="rsschool">
        The Rolling Scopes School
      </a> by our team</h2>
			<div className="welcome-team">
				<div className='developer'>
					<img src={require("../../img/Julia.jpg")} alt="Julia" />
					<span>Julia</span>
				</div>
				<div className='developer'>
					<img src={require("../../img/Maria.jpg")} alt="Maria" />
					<span>Maria</span>
				</div>
				<div className='developer'>
					<img src={require("../../img/Lena.jpg")} alt="Olena" />
					<span>Olena</span>
				</div>
			</div>
		</div>
	);
}
