import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';


function generateRandomButtonPosition() {
  const maxX = window.innerWidth - 100; // Adjust 100 for button width
  const maxY = window.innerHeight - 40; // Adjust 40 for button height
  const newLeft = Math.floor(Math.random() * maxX);
  const newTop = Math.floor(Math.random() * maxY);
  return { left: newLeft, top: newTop };
}

function App() {
  const [yesClicks, setYesClicks] = useState(0);
  const [currentYesMessageIndex, setCurrentYesMessageIndex] = useState(0);
  const [currentOuchLineIndex, setCurrentOuchLineIndex] = useState(0);
  const [showOuchLines, setShowOuchLines] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ left: 0, top: 0 });
  const [noButtonAbsolute, setNoButtonAbsolute] = useState(false); 
  const [allMessagesShown, setAllMessagesShown] = useState(false);




  const yesMessages = [
    "Can I get a hug? 🤗", 
    "Will I get a kiss? 😘", 
    "Will you make it last foreva? 🥰", 
    "Can I touch ur butt? 😏", 
    "Will we makeout? 🙄",
    "Will you be my foreva valentines? 😍"
  ];
  const ouchLines = [
    "Ouch! That stings! 😐", 
    "Well, alright then! 😡", 
    "You're missing out! 😢", 
    "Come on pleeeeeeease??!?!?!?! 😭", 
    "You're gonna regret it! 😒",
    "You're being a butt! 🤬",
    "Don't make me pinch you!!! 😤"
  ];

  const handleYesClick = () => {
    setYesClicks(yesClicks + 1);
    setCurrentYesMessageIndex((prevIndex) => (prevIndex + 1) % yesMessages.length);
    if (yesClicks === yesMessages.length - 1) {
      // All messages have been shown, set the flag
      setAllMessagesShown(true);
    }
  };

  const handleNoClick = () => {
    setShowOuchLines(true);
    setCurrentOuchLineIndex((prevIndex) => (prevIndex + 1) % ouchLines.length);

    // Use the generated coordinates
    const newPosition = generateRandomButtonPosition();
    setButtonPosition(newPosition);

    // Switch the No button to absolute positioning
    setNoButtonAbsolute(true);
  };

  useEffect(() => {
    // Ensure the button stays within screen boundaries
    const handleResize = () => {
      const maxX = window.innerWidth - 100; // Adjust 100 for button width
      const maxY = window.innerHeight - 40; // Adjust 40 for button height

      if (buttonPosition.left > maxX || buttonPosition.top > maxY) {
        const newPosition = generateRandomButtonPosition();
        setButtonPosition(newPosition);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [buttonPosition]);

  const currentYesMessage = yesMessages[currentYesMessageIndex];
  const currentOuchLine = ouchLines[currentOuchLineIndex];

  if (allMessagesShown) {
    return (
      <div style={{ backgroundColor: 'rgba(250,211,218,255)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://media1.tenor.com/m/Glql1LPSciQAAAAC/milk-and-mocha-milk-mocha.gif" width={400} height={400} alt="New GIF" />
        <h1>Sweet! I love you Nugget </h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'rgba(250,211,218,255)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <img src={require('./pikachu.gif')} width={300} height={300} alt="Valentine's GIF" />
      <div>
        {showOuchLines ? <p>{currentOuchLine}</p> : <></>}
      </div>
      <div>
        <Button
          variant='contained'
          color='success'
          onClick={handleYesClick}
          style={{ marginRight: '5px', marginTop: '20px' }}
        >
          {yesClicks === 0 ? "Yes" : `${currentYesMessage}`}
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleNoClick}
          style={{
            position: noButtonAbsolute ? 'absolute' : 'relative', // Toggle position
            left: `${buttonPosition.left}px`,
            top: `${buttonPosition.top}px`,
            marginLeft: `5px`,
            marginTop: `20px`
          }}
        >
          No
        </Button>
      </div>
    </div>
  );
}

export default App;
