import React, { useState, useEffect, useRef } from 'react';
import './Story.css';

// Complete Chapters from M to I (M.A.H.E.S.W.A.R.I) - Date-free and doodle-free
export const storyChapters = [
  {
    letter: "M",
    title: "Making My First Glance at You",
    parts: [
      { text: "Yes, Namma First meet indha College RPSIT — " },
      { text: "an unexpected beginning", highlight: true },
      { text: " nu sollalamaa...? First 2-3 weeks en kannulaye padadha indha ponnu epudraaa enkitaa pesuunaa... naa ponnunga kitaa avlova pesuradhu kedaiyadhu.\n\nNamma thodakame oru chinna sandaii kutty sorry oda, lab la nadandha andha incident. But enaku konja bayam, epdi da pesusradhu, hurt panra mari pesiten, how it could be? But You accepted my sorry.\n\nAnd then daily una class la gavanichite, unaiyaa okandhu nalla sight adhichiruken. Apo nee enaku thaniyaa therinja. I didn't know you'd become my " },
      { text: "favourite chapter", highlight: true },
      { text: ". But something in my chest already knew — this person matters." }
    ]
  },  
  {
    letter: "A",
    title: "Always Laughing Like the World Was Ours",
    parts: [
      { text: "This chapter is about ennaiya sirika vechiruka paithiyam mari. Neraiya phone ah paathu text panitu sirichitu irupanga — idhe nee enaku panirukaa most of the times.\n\nClass la nee oru mari 2sec paathutu siripaa, adhu ipo kooda inum maarala, " },
      { text: "that is something magical", highlight: true },
      { text: ". And nee cringe thanama neraiya comedy panuva chatting la, aana nalla loosu mari siripa.\n\nMall la un kaal vilundhadhu — a man's ego lost in your eyes. Apo nee sirichaa (enaku apo " },
      { text: "unaiya hug pannumnu thonichu", highlight: true },
      { text: "). Nee epovum sirichitu irukanum, that is all I ever want." }
    ]
  },
  {
    letter: "H",
    title: "Holding Feelings I Couldn't Say Aloud",
    parts: [
      { text: "Oru friend ah irundhu konjaa heart crush aaye Lovee ah maarunadhu. Indha feel enakuu romba vandhadhu namma bus la travel pannumbothu unnoda kai ah first time thotta, pudhichita, " },
      { text: "Holded Tightly", highlight: true },
      { text: " — apo thonunadhu un kai aah vida koodadhunu.\n\nUnaa saree la paakum bothu, its nothing to say, its perfect. And enaaiya force panii dii solla vechadhu, un chellama ma.. nu koopudradhu, aproo nicknames: Mahi.., Kolandha, Ammu, Bun uhh, Thakkali, thoppa kutty, koranguu... Na unakaga neraiya nickname vechirukaa, in the top of the list " },
      { text: "Kolandha di nee", highlight: true },
      { text: ".\n\nMall la namma onna ice cream saptuu unnoda last tip of cone na sapudradhu, its kind of love." }
    ]
  },
  {
    letter: "E",
    title: "Every Day Felt Like the Beginning of Forever",
    parts: [
      { text: "This chapter turns Maheswari to " },
      { text: "My Ammu", highlight: true },
      { text: "...\n\nIndha love starts from oru video call. Na aniku un kita kiss pannuviya nu ketadhu, nee adhuku oru mari reaction pannitu aama nu sonnadhu — so lovely moment.\n\nNamma love confess panna andha " },
      { text: "special day", highlight: true },
      { text: ". You told about your past, and shared my past, and that brings the trust about you — quiet beautiful about LOVE. Video calls, silent calls, virtual kisses.\n\nEnaku romba favourite part was nee enaiya Mamaaa.. nu kupudradhu, na unnaiya Pondatii nu solradhu. Daily kutty sandaii, but ena dha sanda potalum na unaa samadhanam panna try paniruken, cause thoonguradhuku munnadi sandhosama thoonganum." }
    ]
  },
  {
    letter: "S",
    title: "Storms We Walked Into Without Knowing",
    parts: [
      { text: "Ella page um romba happy ah irukadhu la. Adhe mari namakula neraiya sandaii. Namma endha alavuku love pannomo adhe alavuku neraiya sandaii dha potrukom, but andha sandai elamm ipo nenachaa silly ah iruku.\n\nBut enaku over possessive, overcaring, overthinking — idhula ennoda mind la unaku na " },
      { text: "highest priority", highlight: true },
      { text: " kudutha. But edhu na pannano adhu ennaiya regret panna vechadhu..." }
    ]
  },
  {
    letter: "W",
    title: "Wounds That Wrote Themselves in Silence",
    parts: [
      { text: "En nee enkita romba open ah irundhum na unaku freedom kuduthadhu kedaiyadhu. What I did to you is absolutely wrong and obviously shameful — that ended with us breaking apart. Idhu namma " },
      { text: "worst chapter in my life", highlight: true },
      { text: ".\n\nNaa unnaiya neraiya thitiruken, vulgar ah pesiruken. Ipo nenaikumbothu oru ponnu kita behave pannadhu enaku romba asingama iruku. I felt very bad for you, and I regret it with all my heart." }
    ]
  },
  {
    letter: "A",
    title: "Apart — But Never Fully Gone",
    parts: [
      { text: "That period was the " },
      { text: "hardest time", highlight: true },
      { text: " for me. Unkita pesama enaku romba kastama irundhadhu. Ennala seriyaa thoongamudiyala, edhukune theriyama una nenachu aluven. Na veetlaye irundhen, veliya kooda polaa.\n\nSongs and memories were all I had in the late nights. Enaku unkita epdi pesuradhunu therla — pesuna thituduva ilaa pudikalnu soliduvanu na pesa kooda try panla. But I learnt from this chapter that edhume nerandharm illa, nee enaku puriya vechadhuku thanks." }
    ]
  },
  {
    letter: "R",
    title: "Returning to Where I Always Belonged",
    parts: [
      { text: "Namma thirumba pesa thotangunadhum again chat la dha. But nee normal ah again pesunadhu was such a surprise. Indha universe la namaku kedaikumnu irundha adhu kandipaa kedaikum.\n\nAnyway, we could be " },
      { text: "great as friends", highlight: true },
      { text: ", or even my crush. Ennoda heart la idhuku melaa yaarukum idham kuduka poradhila — that is the respect I will forever give you. Nee unnoda vazhkaila nalla vazhanum, sirichitute irukanum. That is enough for me." }
    ]
  },
  {
    letter: "I",
    title: "Infinity — Because Some Stories Don't End",
    parts: [
      { text: "If I failed as a friend, I'm sorry.\nIf I failed as a Boyfriend, I'm sorry.\nSorry for hurting you.\n\nSometimes I smile for no reason — it's because of you.\n" },
      { text: "You are the best thing that has ever happened in my life.", highlight: true },
      { text: " You are perfect.\n\n" },
      { text: "I love you, Kolandha.", highlight: true },
      { text: "\nI still love you.\nYou are always special in my life.\nI'm yours, even if you're not mine." }
    ]
  }
];

const Story = ({ onBack, typingSpeed = 24 }) => {
  const [index, setIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef(null);

  const currentChapter = storyChapters[index];
  const totalLength = currentChapter.parts.reduce((acc, p) => acc + p.text.length, 0);

  // Progressive typing effect on page change
  useEffect(() => {
    setCharCount(0);
    setIsTyping(true);
    clearInterval(timerRef.current);

    let current = 0;
    timerRef.current = setInterval(() => {
      current++;
      setCharCount(current);

      if (current >= totalLength) {
        clearInterval(timerRef.current);
        setIsTyping(false);
      }
    }, typingSpeed);

    return () => clearInterval(timerRef.current);
  }, [index, totalLength, typingSpeed]);

  const handlePrev = (e) => {
    e.stopPropagation();
    if (index > 0) {
      setIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (index < storyChapters.length - 1) {
      setIndex(prev => prev + 1);
    } else {
      onBack();
    }
  };

  const handlePageClick = () => {
    if (isTyping) {
      // Complete current chapter text immediately
      clearInterval(timerRef.current);
      setCharCount(totalLength);
      setIsTyping(false);
    } else {
      // Advance to next chapter
      if (index < storyChapters.length - 1) {
        setIndex(prev => prev + 1);
      } else {
        onBack();
      }
    }
  };

  // Render text segments respecting red highlights during typing
  const renderTypedContent = () => {
    let remainingChars = charCount;
    return currentChapter.parts.map((part, pIdx) => {
      if (remainingChars <= 0) return null;
      const partLen = part.text.length;
      const takeCount = Math.min(remainingChars, partLen);
      remainingChars -= takeCount;
      const visibleSnippet = part.text.slice(0, takeCount);

      if (part.highlight) {
        return (
          <span key={pIdx} className="highlight-red">
            {visibleSnippet}
          </span>
        );
      }
      return <span key={pIdx}>{visibleSnippet}</span>;
    });
  };

  return (
    <div className="story-wrapper">
      {/* Discreet floating Home bar above the parchment */}
      <div className="story-top-floating-bar">
        <button
          type="button"
          className="story-home-pill-btn"
          onClick={onBack}
          aria-label="Back to Home Grid"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Home</span>
        </button>
      </div>

      {/* Main Vintage Parchment Sheet (Exact size & aesthetic matching mobile reference image) */}
      <div
        className="parchment-sheet"
        onClick={handlePageClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handlePageClick();
        }}
      >
        {/* Top Header: Circular (←) Page Title Circular (▷) - NO DATES */}
        <div className="note-header">
          <button
            type="button"
            className="note-nav-circle-btn"
            onClick={handlePrev}
            title={index === 0 ? "Back to Home" : "Previous Page"}
            aria-label="Previous Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#3c2010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="note-title-text">
            Page {index + 1} — Chapter {currentChapter.letter}
          </div>

          <button
            type="button"
            className="note-nav-circle-btn"
            onClick={handleNext}
            title={index === storyChapters.length - 1 ? "Finish Story" : "Next Page"}
            aria-label="Next Page"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#3c2010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="8,5 19,12 8,19" fill="none" stroke="#3c2010" />
            </svg>
          </button>
        </div>

        {/* Note Body with Handwritten Text & Red Keyword Highlights */}
        <div className="note-body">
          <div className="note-handwritten-text">
            {renderTypedContent()}
            {isTyping && <span className="note-cursor">|</span>}
          </div>
        </div>

        {/* Clean Note Bottom (Design doodle pattern removed) */}
        <div className="note-footer-clean">
          <div className="note-tap-hint">
            {isTyping ? "tap page to reveal full note" : "tap page or (▷) for next note"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
