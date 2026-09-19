import Style from './user_card.module.css';

type UserCardProps = {
  image: string;
  name: string;
  github: string;
  quote: string;
  position: string;
  contributions: string[];
};

export default function UserCard({ image, name, github, quote, position, contributions }: UserCardProps) {
  return (
    <div className={Style.userCard}>
      <div className={Style.userInfo}>
        <img src={image} alt={name} />
        <div className={Style.userDetails}>
          <a href={github}>
            <h2>{name}</h2>
          </a>
          <h3>{position}</h3>
        </div>
      </div>
      <div className={Style.line} />
      <div className={Style.contributions}>
        <ul>
          {contributions.map((contribution, index) => (
            <li key={index}>{contribution}</li>
          ))}
        </ul>
      </div>
     <div className={Style.quote}>
        <h3>{quote}</h3>
     </div>
    </div>
  );
}