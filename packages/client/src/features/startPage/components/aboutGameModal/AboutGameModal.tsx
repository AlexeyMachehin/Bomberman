import { useState, forwardRef } from 'react';
import { Box, Link } from '@mui/material';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from 'react-spring';
import Tooltip from '@mui/material/Tooltip';
import classes from './aboutGameModal.module.css';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function AboutGameModal() {
  const [isModalOpen, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Open guide">
        <Button onClick={() => setOpen(true)}>About game</Button>
      </Tooltip>
      <Modal
        className={classes.modalWrapper}
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isModalOpen}
        onClose={() => setOpen(false)}
        closeAfterTransition>
        <Fade in={isModalOpen}>
          <Box className={classes.textModal}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Bomberman_series_logo.png/250px-Bomberman_series_logo.png"
              alt=""
            />
            <Typography paragraph sx={{ mt: 2 }}>
              Bomberman (ボンバーマン, Bonbāman, also briefly known as Dyna
              Blaster in Europe[1]) is a video game franchise originally
              developed by Hudson Soft and currently owned by Konami.[2][3] The
              original game, also known as Bakudan Otoko (爆弾男), was released
              in Japan in July 1983 and has since spawned multiple sequels and
              spin-offs released on numerous platforms, as well as several anime
              and manga adaptations. As of 1998, the series has sold over 10
              million copies.[4] The most recent iteration, Amazing Bomberman,
              was released on August 5, 2022 on Apple Arcade.
            </Typography>
            <div>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/9dL0o3voR4c"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen></iframe>
            </div>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Gameplay
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Gameplay Most games in the Bomberman franchise largely revolve
              around two modes of play; single player campaigns where the player
              must defeat enemies and reach an exit to progress through levels,
              and multiplayer modes where players must attempt to eliminate each
              other and be the last one standing. Gameplay involves
              strategically placing down bombs, which explode in multiple
              directions after a certain amount of time, in order to destroy
              obstacles and kill enemies and other players. The player can pick
              up various power-ups, giving them benefits such as larger
              explosions or the ability to place more bombs down at a time. The
              player is killed if they touch an enemy or get caught up in a
              bomb's explosion, including their own, requiring players to be
              cautious of their own bomb placement. In addition to the main
              maze-based Bomberman games, some spin-off titles involve
              adventure, platformer, puzzle, and kart racing gameplay.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Plot
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              Several games in the series are loosely connected through
              recurring characters and settings. The 1985 game for Famicom /
              Nintendo Entertainment System (and Atomic Punk for Game Boy)
              begins with "Bomberman" (the eponymous character of the game) who
              worked day in and day out making bombs in an underground compound,
              but he dreamed of liberty, so he plotted his escape. After hearing
              a rumor that robots reaching the surface become human, he decides
              to escape. He was aided by the only skill he knew, bomb making. He
              uses the bombs to destroy the enemies preventing his escape and to
              clear blocked walls. When he reaches the surface, he transforms
              into an organic human being and becomes known as the "Runner".
              This storyline is not present in some versions, such as Bomberman
              Party Edition, and this setting was largely abandoned but used for
              connections with Hudson's Lode Runner games and Bomberman: Act
              Zero. In the Bomberman for the TurboGrafx-16, Bomberman is used as
              a prototype for further Bomberman robots by Dr. Mitsumori. To
              distinguish him from other Bombermen,[6] the main character is
              given the name White Bomberman (or White Bomber). In earlier
              appearances, the second Bomberman model (known as Black Bomberman)
              was usually the rival or the main antagonist. In the Super
              Bomberman series, the two characters would regularly join forces
              to handle bigger threats, most notably the evil alien Professor
              Bagura and the Five Dastardly Bombers, the Hige Hige Bandits (led
              by Mujoe and Dr. Mechado), as well as a mysterious rival known as
              Regulus.
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Characters
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              <b>Bomberman</b> , also referred to as "White Bomberman", "White
              Bomber", "Cheerful White" (in Bomberman Land Touch!), "Bomber
              John" (in Bomberman Touch), and (in Japan) "Shirobon", is the hero
              of the series. In the standard games, he is the protagonist and
              player-character. He is usually portrayed as the heroic yet
              cheerful type, often saving his home planet from disaster. Like
              all Bombermen, he has the ability to generate bombs in his hands.
              In later games, such as Bomberman Max and Bomberman Tournament, he
              is shown to be part of an interplanetary police force stationed at
              Bomber Base. The White Bomberman also made appearances in other
              games, such as Wario Blast: Featuring Bomberman!, a Bomberman game
              featuring Bomberman alongside Nintendo mascot Mario's rival, Wario
              (although that was not the case in Japan). He also appears in
              DreamMix TV World Fighters—a Hudson fighting game with characters
              from Hudson Soft, Konami, and Takara, and in the Nintendo fighting
              game Super Smash Bros. Ultimate as a non-playable Assist Trophy
              and as a Mii Fighter outfit. He even makes a giant playable
              appearance in Star Parodier, a spoof of the Star Soldier series,
              which is also developed by Hudson Soft. He has been featured in
              three anime series; Bomberman B-Daman Bakugaiden and Bomberman
              B-Daman Bakugaiden V are based on the marble shooting game
              B-Daman, while Bomberman Jetters inspired the video game of the
              same name. In the anime Bomberman Jetters, he had an older brother
              named Mighty. and he also made a cameo appearance in the 2015
              film, Pixels.
              <br /> <b>Black Bomberman</b> ("Cool Black" in Bomberman Land
              Touch!) looks identical to Bomberman, only he is colored black and
              doesn't have white pants. In many of his first appearances, he was
              shown to be the main rival of Bomberman, often performing acts
              such as robbing banks to fight him. He eventually becomes a
              gradual friend of Bomberman, and acts as the second player in the
              two-player story modes of the games. Hudson has given him a cool
              and collected personality in the later games. In his first
              appearance, he also led Red Bomber, Blue Bomber, Green Bomber, and
              Yellow Bomber. Max first appears in Bomberman Max as one of the
              main characters. He is somewhat competitive and arrogant, as shown
              in his first appearance that despite the urgency of the mission,
              he challenges Bomberman to a contest to see who can gather the
              most Charaboms.
              <br /> <b>Max</b> wears a black suit of armor with a helmet that
              completely hides his face. He is also a playable character in the
              game Bomberman Jetters, where he joins Bomberman in the fight
              against the Hige Hige Bandits again, and he is an unlockable
              character for the battle mode of Bomberman Generation. He is also
              unlockable in Bomberman 2 for Nintendo DS. His backstory is
              greatly expanded upon in Bomberman Tournament, revealing him to be
              a native of the planet Phantarion who became a cyborg due to
              injuries sustained during the first invasion attempt of the Five
              Dastardly Bombers.
              <br /> <b>Dr. Ein</b> (also known as Professor Ein) is a scientist
              who assists Bomberman. He is eccentric and doesn't seem to show
              many emotions. He is fat, has white spiky hair, and glasses with
              spirals covering the lenses. Despite never having a playable
              appearance, one of the customization sets in Bomberman Live lets
              Bomberman wear Dr. Ein's lab coat and glasses.
              <br /> <b>Charabon</b>
              (also known as Karabon) are small creatures that help Bomberman
              progress by granting him abilities. First appearing in Bomberman
              Max, each game featuring Charabon features a unique set of them.
              Bomberman often finds Charabon trapped in cages, and he can
              partner with one to use its ability. He can also fuse them
              together and battle them against others. Pommy is a recurring
              Charabon, who first appears in Bomberman 64: The Second Attack,
              where he is a loyal, but cowardly sidekick and a mimic. He is
              capable of shooting lightning and taking on many different forms.
              In Bomberman Tournament, he can teleport. Charabons have four
              possible elemental attributes, of which they can have up to three:
              Fire, represented by dinosaurs and dragons; Water, represented by
              fish and mollusks; Earth, represented by beasts; and Electric,
              represented by Pommy's various forms. The elemental attributes
              have a simple rock-paper-scissors relationship, with Water being
              strong against Fire, Fire being strong against Earth, Earth being
              strong against Electric, and Electric being strong against Water
              (Water and Earth are neutral against each other and usually don't
              harm each other; the same is true of Fire and Electric).
              <br /> <b>Louie</b>
              (also known as Rooi) are kangaroo-like animals with rabbit ears
              who help Bomberman by letting him ride on their backs. In Super
              Bomberman 4, they were replaced by various animals, and in Saturn
              Bomberman by the dinosaur-like Tyra / Tirra. <br />
              <b>The Bad Bombers</b>
              (a.k.a. the Five Dastardly Bombers) are a gang of five recurring
              boss enemies in several games of the series. They were produced by
              Professor Bagura.[7] Magnet Bomber sports a scarf-like cape, has a
              magnet shape attached to his helmet, and uses bombs that are
              attracted to his enemies. Golem Bomber is much larger than the
              others and he utilizes fire bombs. Pretty Bomber is distinguished
              from her male counterparts by her pink skirt, yellow neckerchief,
              and the large yellow heart attached to her helmet. She also
              appears as a close friend to Bomberman in several games, where
              both White and Black Bomber are attracted to her. Brain
              Bomber(known as Phantom Bomber in Super Bomberman R) is the
              engineer of the group, who wears a cloak and has the symbol of a
              crown on his helmet. He is shorter than the other characters and
              sometimes floats above the group. Plasma Bomber is the leader.
              Plasma Bomber wears a neckerchief and has a lightning bolt
              attached to his helmet that can create electric currents.
              <br /> <b>Professor Bagura</b> (also known as Bagular, Burglar or
              Bugler) is the main villain in many of the games. He resembles a
              blue and white, large, elderly man with a bushy white beard, a
              monocle, and a cape. He first appears as the main villain of
              Bomberman '94, in which he attempts to run a comet-disguised ship
              into Planet Bomber after throwing it into chaos. He later appears
              in several games, including Super Bomberman 3, Super Bomberman 4,
              Bomberman Hero, Bomberman World, and Neo Bomberman. In some odd
              appearances, he is reduced to a brain that wants to rebuild an
              empire and wants revenge on Bomberman. In the anime, he is the
              true leader of the Hige Hige Bandits, with Mujoe as his
              second-in-command. Dr. Mechado also serves the group by creating
              technology, such as the Hige-Hige Bandits, small robotic minions
              who are very weak and serve under Mujoe.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
