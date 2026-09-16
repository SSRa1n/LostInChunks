import styles from './about_page.module.css'

import UserCard from '../../components/user_card/user_card'

import { useEffect, useState } from 'react';

type Member = {
  name: string;
  image: string;
  github: string;
  quote: string;
  position: string;
  contributions: string[];
};

export default function AboutPage() {
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    fetch('./members.json')
      .then(response => response.json())
      .then((data: Member[]) => setMembers(data));
  }, []);

  return (
    <div className={styles.aboutPage}>
      <h1>About Us</h1>
      <div className={styles.contributors}>
        {members.map((member, index) => (
          <UserCard 
            key={index}
            name={member.name}
            image={member.image}
            github={member.github}
            quote={member.quote}
            position={member.position}
            contributions={member.contributions} />
        ))}        
      </div>
    </div>
  );
}