type TitleProps = {
  title: string;
  children?: string;
};

export const Title = ({ title = '' }: TitleProps) => <h1>{title}</h1>;

function Home() {  
  return (
    <div className="main">
      <Title title="To add title" />
      <p>TODO: render list of boards here</p>
    </div>
  );
}

export default Home;
