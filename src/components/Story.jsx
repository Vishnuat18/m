import React, { useState, useEffect, useRef } from 'react';
import './Story.css';

// Complete Chapters from M to I (M.A.H.E.S.W.A.R.I) based on Chapter 1.txt
export const storyChapters = [
  {
    letter: "M",
    title: "Making My First Glance at You",
    date: "Aug 16th, 2022",
    text: "Yes, Namma First meet indha College RPSIT — an unexpected beginning nu sollalamaa...? First 2-3 weeks en kannulaye padadha indha ponnu epudraaa enkitaa pesuunaa... ivan ponnunga kitaaye pesamatan.\n\nNamma thodakame oru chinna sandaii kutty sorry oda, lab la nadandha andha incident. But enaku konja bayam, epdi da pesusradhu, hurt panra mari pesiten, how it could be? But You accepted my sorry.\n\nAnd then daily una class la gavanichite, unaiyaa okandhu nalla sight adhichiruken. Apo nee enaku thaniyaa therinja. I didn't know you'd become my favourite chapter. But something in my chest already knew — this person matters."
  },
  {
    letter: "A",
    title: "Always Laughing Like the World Was Ours",
    date: "Sep 24th, 2022",
    text: "This chapter is about ennaiya sirika vechiruka paithiyam mari. Neraiya phone ah paathu text panitu sirichitu irupanga — idhe nee enaku panirukaa most of the times.\n\nClass la nee oru mari 2sec paathutu siripaa, adhu ipo kooda inum maarala, that is something magical. And nee cringe thanama neraiya comedy panuva chatting la, aana nalla loosu mari siripa.\n\nMall la un kaal vilundhadhu — a man's ego lost in your eyes. Apo nee sirichaa (enaku apo unaiya hug pannumnu thonichu). Nee epovum sirichitu irukanum, that is all I ever want."
  },
  {
    letter: "H",
    title: "Holding Feelings I Couldn't Say Aloud",
    date: "Nov 11th, 2022",
    text: "Oru friend ah irundhu konjaa heart crush aaye Lovee ah maarunadhu. Indha feel enakuu romba vandhadhu namma bus la travel pannumbothu unnoda kai ah first time thotta, pudhichita, Holded Tightly — apo thonunadhu un kai aah vida koodadhunu.\n\nUnaa saree la paakum bothu, its nothing to say, its perfect. And enaaiya force panii dii solla vechadhu, un chellama ma.. nu koopudradhu, aproo nicknames: Mahi.., Kolandha, Ammu, Bun uhh, Thakkali, thoppa kutty, koranguu... Na unakaga neraiya nickname vechirukaa, in the top of the list Kolandha di nee.\n\nMall la namma onna ice cream saptuu unnoda last tip of cone na sapudradhu, its kind of love."
  },
  {
    letter: "E",
    title: "Every Day Felt Like the Beginning of Forever",
    date: "Feb 14th, 2024",
    text: "This chapter turns Maheswari to My Ammu...\n\nIndha love starts from oru video call. Na aniku un kita kiss pannuviya nu ketadhu, nee adhuku oru mari reaction pannitu aama nu sonnadhu — so lovely moment.\n\nNamma love confess panna day Feb 14, 2024. You told about your past, and shared my past, and that brings the trust about you — quiet beautiful about LOVE. Video calls, silent calls, virtual kisses.\n\nEnaku romba favourite part was nee enaiya Mamaaa.. nu kupudradhu, na unnaiya Pondatii nu solradhu. Daily kutty sandaii, but ena dha sanda potalum na unaa samadhanam panna try paniruken, cause thoonguradhuku munnadi sandhosama thoonganum."
  },
  {
    letter: "S",
    title: "Storms We Walked Into Without Knowing",
    date: "Jun 18th, 2024",
    text: "Ella page um romba happy ah irukadhu la. Adhe mari namakula neraiya sandaii. Namma endha alavuku love pannomo adhe alavuku neraiya sandaii dha potrukom, but andha sandai elamm ipo nenachaa silly ah iruku.\n\nBut enaku over possessive, overcaring, overthinking — idhula ennoda mind la unaku na highest priority kudutha. But edhu na pannano adhu ennaiya regret panna vechadhu..."
  },
  {
    letter: "W",
    title: "Wounds That Wrote Themselves in Silence",
    date: "Oct 5th, 2024",
    text: "En nee enkita romba open ah irundhum na unaku freedom kuduthadhu kedaiyadhu. What I did to you is absolutely wrong and obviously shameful — that ended with us breaking apart. Idhu namma worst chapter in my life.\n\nNaa unnaiya neraiya thitiruken, vulgar ah pesiruken. Ipo nenaikumbothu oru ponnu kita behave pannadhu enaku romba asingama iruku. I felt very bad for you, and I regret it with all my heart."
  },
  {
    letter: "A",
    title: "Apart — But Never Fully Gone",
    date: "Dec 12th, 2024",
    text: "December was the hardest month for me. Unkita pesama enaku romba kastama irundhadhu. Ennala seriyaa thoongamudiyala, edhukune theriyama una nenachu aluven. Na veetlaye irundhen, veliya kooda polaa.\n\nSongs and memories were all I had in the late nights. Enaku unkita epdi pesuradhunu therla — pesuna thituduva ilaa pudikalnu soliduvanu na pesa kooda try panla. But I learnt from this chapter that edhume nerandharm illa, nee enaku puriya vechadhuku thanks."
  },
  {
    letter: "R",
    title: "Returning to Where I Always Belonged",
    date: "Jan 28th, 2025",
    text: "Namma thirumba pesa thotangunadhum again chat la dha. But nee normal ah again pesunadhu was such a surprise. Indha universe la namaku kedaikumnu irundha adhu kandipaa kedaikum.\n\nAnyway, we could be great as friends, or even my crush. Ennoda heart la idhuku melaa yaarukum idham kuduka poradhila — that is the respect I will forever give you. Nee unnoda vazhkaila nalla vazhanum, sirichitute irukanum. That is enough for me."
  },
  {
    letter: "I",
    title: "Infinity — Because Some Stories Don't End",
    date: "Forever & Ever",
    text: "If I failed as a friend, I'm sorry.\nIf I failed as a Boyfriend, I'm sorry.\nSorry for hurting you.\n\nSometimes I smile for no reason — it's because of you.\nYou are the best thing that has ever happened in my life. You are perfect.\n\nI love you, Kolandha.\nI still love you.\nYou are always special in my life.\nI'm yours, even if you're not mine."
  }
];

const Story = ({ onBack, typingSpeed = 30 }) => {
  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef(null);

  const currentChapter = storyChapters[index];

  // Typing animation effect on page change
  useEffect(() => {
    setCharCount(0);
    setIsTyping(true);
    clearInterval(timerRef.current);

    const fullText = currentChapter.text;
    let currentIdx = 0;

    timerRef.current = setInterval(() => {
      currentIdx++;
      setCharCount(currentIdx);

      if (currentIdx >= fullText.length) {
        clearInterval(timerRef.current);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(timerRef.current);
  }, [index, currentChapter, typingSpeed]);

  const handlePrev = () => {
    if (index > 0) {
      setIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleNext = () => {
    if (index < storyChapters.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      onBack();
    }
  };

  const handleBodyClick = () => {
    if (isTyping) {
      // Complete text instantly
      clearInterval(timerRef.current);
      setCharCount(currentChapter.text.length);
      setIsTyping(false);
    } else {
      handleNext();
    }
  };

  return (
    <div className="story-wrapper">
      <div className="parchment-sheet">
        {/* Top Navigation Bar: Prev Button, Page Title, Next Button */}
        <div className="note-header">
          <button
            type="button"
            className="note-nav-circle-btn"
            onClick={handlePrev}
            title={index === 0 ? "Back to Home" : "Previous Page"}
            aria-label="Previous Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="note-title-text">
            Page {index + 1} - {currentChapter.date}
          </div>

          <button
            type="button"
            className="note-nav-circle-btn"
            onClick={handleNext}
            title={index === storyChapters.length - 1 ? "Finish Story" : "Next Page"}
            aria-label="Next Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Chapter Title & Letter Badge */}
        <div className="note-chapter-heading">
          Chapter {currentChapter.letter} • {currentChapter.title}
        </div>

        {/* Note Body with Handwriting Text */}
        <div className="note-body" onClick={handleBodyClick}>
          <div className="note-handwritten-text">
            {currentChapter.text.slice(0, charCount)}
            {isTyping && <span className="note-cursor">|</span>}
          </div>
        </div>

        {/* Footer with Hand-Drawn Doodles matching Image 2 */}
        <div className="note-footer">
          <div className="note-doodles">
            <span className="doodle-grid">▦</span>
            <span>→</span>
            <span>↓</span>
            <span>↗</span>
            <span>↓</span>
            <span>↓</span>
            <span>←</span>
            <span>←</span>
            <span>↑</span>
          </div>

          <div className="note-progress-tag">
            {index + 1} / {storyChapters.length} • {currentChapter.letter}
          </div>
        </div>

        <div className="note-tap-hint">
          {isTyping ? "tap to show full note" : "tap note or next arrow for next chapter"}
        </div>
      </div>
    </div>
  );
};

export default Story;
