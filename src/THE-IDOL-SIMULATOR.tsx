// @ts-nocheck
// Temporary TypeScript fix for GitHub Pages deployment
/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyObject = any;

import { DndContext, useDraggable, useDroppable, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import DailyChartModal from './DailyChartModal';

import { useIdolManager, getTotalFansForMember, getFormattedDateForWeek, productionTiers, getGraduationRisk, songTitles, generateSongTitle, electionSpeechTemplates, performanceTypes, scandalResponseOptions, tiers, getTheaterCapacity, getTicketPrice, hometowns, generateRandomHometown,  warehouseTiers, staffTiers, ambitions } from "./hooks/useIdolManager";

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { 
  Star, Briefcase, Paintbrush, Music, Heart, Library, TrendingUp, Users, Award, Calendar, DollarSign, Save, 
  Upload, Building, Tv, GripVertical, Gift, Goal, Trophy, Sparkles, AlertCircle, AlertTriangle, Zap, Globe, 
  Film, Plane, GraduationCap, Shirt, Shield, Camera, BarChart3, Bell, X, Edit, Plus, Shuffle, 
  User, Check, ChevronDown, ChevronUp, ShoppingBag, Mic, Hand, Lock, Brain, Package,
  Minimize2, Maximize2, Trash2, MapPin, Smile, LogIn, CalendarCheck, Home, 
  ClipboardCheck, Clock, Moon, BarChart2, FileText, Scissors, Wrench, Layers, Clipboard
} from 'lucide-react';


import { MerchTab } from './MerchTab';


const App = () => {


    // Destructure everything from the custom hook
    const {
    // State
    exchangeStudents, activeChart, gameHistory, draftKaigi, draftProspects, liveSportsFestival, simulateSportsFestivalEvent, finishSportsFestival, startSportsFestival, sportsFestivalHistory, lastRequestHourResult, startRequestHour, castPlayerVotes, requestHourStatus, votingTickets, requestHourHistory, groupReputation, confirmKouhakuParticipation, declineKouhakuInvitation, kouhakuHistory, kouhakuInvitationOffered, acceptKouhakuInvitation, simulateJankenRound, electionHistory, jankenHistory, setLastJankenResult, lastJankenResult, startJankenTournament, advanceJankenRound, jankenTournament, setJankenTournament, gameStarted, setGameStarted, groupName, money, week, formattedDate, members, electionVotePool, setElectionVotePool, isElectionSingleFinished, lastElectionResult, isCampaignActive, setIsCampaignActive, campaignEndWeek, setCampaignEndWeek, setMembers, handleTogglePushMember, pushedMembers, setPushedMembers, selectedMember, scheduledEvents, setScheduledEvents, setSelectedMember, message, setMessage, totalFans, setTotalFans, currentTab, setCurrentTab, showNotifications, setShowNotifications, notifications, setNotifications, pastReleases, songs, setSongs, teams, setTeams, allSetlists, setAllSetlists, theaterSongs, setTheaterSongs, buildings, setBuildings, theaters, setTheaters, setWeek, setMoney, sisterGroups, setScheduledSingles, setSisterGroups, rivalGroups, setRivalGroups, achievements, hallOfFame, events, sponsorships, showModal, setShowModal, modalData, setModalData, activeScandal, setActiveScandal, selectedSisterGroup, setSelectedSisterGroup, selectedTheaterTeam, setSelectedTheaterTeam, username, setUsername, memberView, setMemberView, merchInventory, setMerchInventory,  merchDesignBonus, beginActivity, merchTiers, idolMerchTiers, eventMerchTiers, produceEventMerch, eventMerchInventory, idolMerchInventory, produceIdolMerch, activeTour, setActiveTour, venues, setVenues, performanceHistory, setPerformanceHistory, performanceTypes, auditionCandidates, setAuditionCandidates, mediaJobDoneThisWeek, setMediaJobDoneThisWeek, groupMediaJobDoneThisWeek, setGroupMediaJobDoneThisWeek,
    // Firebase/Persistence
    getSavedGames, saveGame, loadGame,
    // Utilities
    startGame, getAllAvailableMembers, getFormattedDateForWeek, getMemberById, updateMemberState, getMemberGroupStatus, getMemberRank, addNotification, getMainGroupRoster,
    // Logic
    startExchangeProgram, startCollaboration, executeShuffle, initiateShuffle, completedPromotions, runAnnualAwards, annualAwardsHistory, groupRoles, appointCaptain, handleAiDraftPick, finishDraft, handlePlayerDraftPick, advanceDraftStage, startDraftKaigi, pendingMerch, warehouse, upgradeWarehouse, trainMember, onlineStore, upgradeOnlineStore, staff, hireStaff, restMember, restAllTired, buildTheater, upgradePracticeRoom, upgradeTheater, buildSisterTheater, renameTheater, handleCheatCode, startTour, progressTour, createTeam, editTeam, saveTeam, deleteTeam, showTeamDetails, startTheaterShowPrep, graduateMember, askAboutGraduation, handleScandalResponse, holdTheaterShow, holdSisterGroupShow, holdElection, createSong, createCustomSetlist, confirmCreateSetlist, scheduleNewSingle, scheduleNewAlbum, executeAlbumRelease, handleDisbandSisterGroup, handleConfirmEditGroupName, produceMerch, openHandshakeModal, executeHandshakeEvent, startTrainingCamp, startMediaJob, startGroupMediaJob, nextWeek, confirmExchangeStudent, confirmCreateSisterGroup, handleSisterMemberTransfer, recordPerformance, startPerformancePrep, holdMajorConcert, runElectionLogic, startSenbatsuPromotion, holdPressConference,  completedBsidePromos, setCompletedBsidePromos, startBsidePromotion, startElectionCampaign, createElectionPoster, createElectionPosterForAll, createAppealVideoForAll, startAudition, confirmRecruitment, handleSetTrainingFocus, assignRandomTraining, assignLowestSkillTraining

    } = useIdolManager();

    // Local state for start screen inputs (not part of the main game state in the hook)
    const [startUsername, setStartUsername] = useState('');
    const [startGroupName, setStartGroupName] = useState('');
    const [savedGames, setSavedGames] = useState([]);

    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Initialize state based on the class on the <html> element
        return document.documentElement.classList.contains('dark');
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
        useEffect(() => {
        if (!gameStarted) {
            const games = getSavedGames();
            console.log("Saved games found on load:", games);
            setSavedGames(games);
        }
    }, [gameStarted, showModal]);


    // --- NEW STATE FOR SORT/FILTER ---
    const [memberSort, setMemberSort] = useState({ key: 'rank', asc: true });
    const [memberFilter, setMemberFilter] = useState('all');
    const [selectedSingleForPromo, setSelectedSingleForPromo] = useState(null);

    useEffect(() => {
        const allChartingSingles = [
            ...songs.filter(s => s.type === 'single' && s.chartWeeksLeft > 0),
            ...sisterGroups.flatMap(sg => (sg.songs || []).filter(s => s.type === 'single' && s.chartWeeksLeft > 0))
        ];
        
        const firstChartingId = allChartingSingles.length > 0 ? allChartingSingles[0].id : null;

        if (selectedSingleForPromo && !allChartingSingles.some(s => s.id === selectedSingleForPromo)) {
            setSelectedSingleForPromo(firstChartingId);
        } else if (!selectedSingleForPromo && firstChartingId) {
            setSelectedSingleForPromo(firstChartingId);
        }
    }, [songs, sisterGroups]);


    const getAvgSkill = (m) => ((m.singing || 0) + (m.dancing || 0) + (m.variety || 0) + (m.visual || 0) + (m.charisma || 0) + (m.intelligence || 0)) / 6;
    // --- END NEW STATE ---



    useEffect(() => {
        const mainFans = (members || []).reduce((sum, m) => sum + getTotalFansForMember(m), 0);
        const sisterFans = (sisterGroups || []).flatMap(sg => sg.members || []).reduce((sum, m) => sum + getTotalFansForMember(m), 0);
        const exchangeFans = (exchangeStudents || []).reduce((sum, ex) => sum + getTotalFansForMember(ex.member), 0);
        setTotalFans(mainFans + sisterFans + exchangeFans);
    }, [members, sisterGroups, exchangeStudents]);


    // Utility function to generate a random name for the startup screen
    const generateRandomGroupName = () => {
      const prefixes = ['Hoshi','Sakura','Tsuki','Ame','Yume','Hana','Aoi','Hikari','Mizu','Kumo','Kaze','Yuki','Kokoro','Akari','Nozomi','Kiseki','Seika','Ameiro','Momoiro','Aozora','Hoshimi','Hanabi','Miyabi','Tokimeki','Ariake','Kouyou','Asahi','Kouka','Suiren','Kurenai','Starlit','Moonlite','Petalix','Blossia','KiraKira','Sparkleon','Dreamia','Twinkia','Glowin','Lumina','Aurasia','MiraiX','Flawra','Cherrix','Fantasia','Hoshira','Sakurive','Prismia','Melodia','Radiant','Hanaria','Yumelia','Akuria','Sakurune','Hoshika','Tsukira','Fuwaria','Kirafine','Mizura','Aozelle','Momoria','Nijika','Haruline','Kokolia','Amelune','Lunaria','Miraiya','Shinoria','Tokira','Asteria','Celestia','Vividia','Eterneo','Luvia','Rhythmex','Purella','Zellia','Xylia','Novelle','Harmonix','Bellaria','Chocola','Sweetia','Angellic','Seraphia','Galaxia','Nebulla','Stellaris','Orion','Eclipsa','Solaria','Lyra','Vespera','Aethel','Nyx','Aura','Lyrica','Sonnet','Fable','Mythia','Legendia','FuwaFuwa','MeroMero','PikaPika','MochiMochi','KyunKyun','PuruPuru','Ribbon','Hearty','Lovely','Berry','Peachia','Milky','Parfait','Soufflé','Sugar','Candy','Bonbon','Chiffon','Marshmo','Lace','Frill','Tiara','Jewelly','Shiny','Pastel','PopStep','Beatly','Melty','Honey','Bunny','Kitty','Puppy','Pony','Cookie','Creamy','Dreamy','Wishy','Magic','Magica','Wand','Starry','Twinkle','Sparkle','Dazzle','Glimmer','Plume','Petit','Belle','Mignon','Ange','Chouchou','Lulu','Mimi','Nana','Coco','Ruru','Kiki','Lala','Nono'];
      const symbols = ['✩', '★', '☆', '✦', '✧', '⊹', '♡', '♥', '❤︎', '✿', '❀', '❃', '❁', '・', '×', '⚡︎', '❖', '◈', '◇', '◆', '∆', '∇', '／', '≠', '≈', '∞', '♪', '♫', '♬', '♩', '♭', '♯', '†', '‡', ' ', ' ', ' ', ' '];      
      const suffixes = ['48','46','Key','Girls','Project','Idols','Stars','Z','Unit','Crew','X','Wave','Beat','Stage','Dream','Lite','Mode','Charm','Flow','Vision','Tone','Pop','Bloom','Rise','Edge','Link','Sphere','Note','Line','46','Team','Stage48','Factory','Palette','Branch','Station','Campus','Zaka','Slope','District','Section','Division','Area','Side','Point','Club','Chuu','Hearts','Notes','Melody','Rabbits','Dreamers','Angels','Spark','Fantasy','Rhythm','Harmony','Kyun','ChuChu','Piyo','Puff','Mochi','Luv','Nyan','Koko','Poko','Ruru','Neo','Zero','01','Alpha','Beta','Omega','Type-A','Type-B','Type-X','Generation','Phase','System','Circuit','Signal','Protocol','Delta','Sigma','Infinity','Burst','Dive','Dash','Max','Hyper','Ultra','Sonic','Velocity','Drive','Force','Impact','Strike','Sparkle','Shine','Glitter','Flash','Flare','Glow','Beam','Blast','Boost','Aura','Spirit','Power','Energy','Soul','Passion','Kiss','Berry','Candy','Honey','Sweet','Sugar','Cookie','Parfait','Ribbon','Lace','Tiara','Princess','Queen','Doll','Bunny','Kitty','Puppy','Mouse','Bear','Panda','Choco','Mint','Lemon','Peach','Cherry','Apple','Bloom','Petal','Leaf','Garden','Forest','Island','World','Universe','Galaxy','Cosmos','Orbit','Planet','Moon','Sun','Sky','Cloud','Rain','Snow'];
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
      setStartGroupName(`${prefix}${symbol}${suffix}`);
    };

const generateRandomTheaterSongName = () => {
    const prefixes = [
        'Miracle', 'Dream', 'Future', 'Shining', 'Eternal', 'Crystal', 'Starlight', 'Lovely', 'Happy', 'Galaxy',
        'Cosmic', 'Rainbow', 'Diamond', 'Angelic', 'First', 'Sekai', 'Kiseki', 'Mugen', 'Hikari', 'Aozora',
        'Pure', 'Sweet', 'Zutto', 'Motto', 'Kira', 'Neon', 'Urban', 'Midnight', 'Shinya', 'Hajimari',
        'Secret', 'Silent', 'Brave', 'Global', 'Cyber', 'Digital', 'Retro', 'Classic', 'Sora', 'Umi',
        'Hoshi', 'Tsuki', 'Taiyou', 'Kaze', 'Ame', 'Yume', 'Ai', 'Kizuna', 'Kokoro', 'Tamashii',
        'Golden', 'Silver', 'Platinum', 'Ruby', 'Sapphire', 'Emerald', 'Velvet', 'Silk', 'Glass', 'Plastic',
        'Mabushii', 'Setsunai', 'Hakanai', 'Tsuyoi', 'Yasashii', 'Amai', 'Nigai', 'Akai', 'Aoi', 'Shiroi',
        'Kuroi', 'Guren', 'Shinku', 'Azure', 'Indigo', 'Prism', 'Sparkle', 'Twinkle', 'Glitter', 'Fancy',
        'Infinity', 'Omega', 'Alpha', 'Delta', 'Zero', 'Final', 'Last', 'Next', 'Neo', 'Ultra',
        'Kibou', 'Zettai', 'Genkai', 'Unmei', 'Innocent', 'Legend', 'Myth', 'Mystic', 'Fancy', 'Kawaii'
    ];    
    const suffixes = [
        'Melody', 'Harmony', 'Rhythm', 'Wave', 'Dreamer', 'Note', 'Symphony', 'Kiss', 'Love', 'Heart',
        'Stage', 'Smile', 'Glitter', 'Beat', 'Step', 'Uta', 'Koe', 'Hibiki', 'Oto', 'Dance',
        'Kaze', 'Nami', 'Sora', 'Hoshi', 'Hikari', 'Yume', 'Michi', 'Saka', 'Tobira', 'Kagi',
        'Ring', 'Bell', 'Chime', 'Ticket', 'Pass', 'Route', 'Map', 'Line', 'Gate', 'Zone',
        'Signal', 'Echo', 'Resonance', 'Phase', 'Mode', 'Style', 'Flow', 'Glow', 'Flash', 'Beam',
        'Kizuna', 'Omoide', 'Kioku', 'Yakusoku', 'Negai', 'Inori', 'Sanka', 'Hana', 'Tsubasa', 'Hane',
        'World', 'Planet', 'Star', 'Moon', 'Sun', 'Sky', 'Sea', 'Ocean', 'Island', 'Garden',
        'Hero', 'Idol', 'Hime', 'Angel', 'Fairy', 'Spirit', 'Ghost', 'Shadow', 'Light', 'Dark',
        'Chronicle', 'Story', 'Tale', 'Legend', 'Episode', 'Scene', 'Act', 'Show', 'Live', 'Encore',
        'Namida', 'Smile', 'Peace', 'Vibe', 'Magic', 'Power', 'Energy', 'Burst', 'Impact', 'Spark'
    ];    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    return `${prefix} ${suffix}`;
};
    

    // Pass local state to the hook's startGame function
    const handleStartGame = () => startGame(startUsername, startGroupName);
    

    // --- MODAL COMPONENTS (Remain in App for clean state access) ---

const MemberSelectionList = ({ members, selectedIds, toggleMember, disabled = false, teams, sisterGroups, groupName }) => {
    const [activeTab, setActiveTab] = useState('all');

    const TABS = [
        { id: 'all', name: 'All' },
        { id: 'main', name: groupName },
        ...(teams || []).map(t => ({ id: `team-${t.id}`, name: `Team ${t.name}` })),
        ...(sisterGroups || []).map(sg => ({ id: `sg-${sg.id}`, name: sg.name }))
    ].filter(tab => {
        if (tab.id.startsWith('sg-')) return (sisterGroups.find(sg => sg.id === parseInt(tab.id.split('-')[1]))?.members || []).length > 0;
        return true;
    });

    const getFilteredMembers = () => {
        const memberList = members || [];
        if (activeTab === 'all') return memberList;
        if (activeTab === 'main') return memberList.filter(m => !m.isSister || (m.kenninGroups || []).includes('main'));
        if (activeTab.startsWith('team-')) {
            const teamId = activeTab.split('-')[1];
            const team = (teams || []).find(t => String(t.id) === teamId);
            const teamMemberIds = (team?.members || []).map(String);
            return memberList.filter(m => teamMemberIds.includes(String(m.id)));
        }
        if (activeTab.startsWith('sg-')) {
            const sgId = activeTab.split('-')[1];
            return memberList.filter(m => String(m.groupId) === sgId);
        }
        return [];
    };
    
    const filteredMembers = getFilteredMembers();

    return (
        <div>
            <div className="flex flex-wrap gap-1 border-b mb-2 pb-2">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-2 py-1 text-xs rounded-full transition-colors ${activeTab === tab.id ? 'bg-blue-600 text-white font-semibold' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="max-h-40 overflow-y-auto border p-2 rounded bg-gray-50 dark:bg-gray-900">
                {(filteredMembers).map(member => (
                  <div
                    key={member.rosterId}
                    className={`p-1 text-sm flex justify-between items-center cursor-pointer rounded
                    bg-white dark:bg-gray-800
                    text-gray-800 dark:text-gray-100
                    hover:bg-gray-100 dark:hover:bg-gray-700
                    ${selectedIds.map(String).includes(String(member.id))
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : ''}
                    ${member.isSister ? 'italic text-gray-700 dark:text-gray-300' : ''}`}

                    onClick={() => !disabled && toggleMember(member.id)}
                  >
                    <span>{member.name} {member.isSister && !member.isKennin ? `(${member.homeGroup})` : ''} {member.isKennin ? '(Kennin)' : ''}</span>
                    {selectedIds.map(String).includes(String(member.id)) ? <Check size={16} className="text-blue-600" /> : <Plus size={16} className="text-gray-400" />}
                  </div>
                ))}
                 {filteredMembers.length === 0 && <p className="text-center text-gray-500 p-2">No members in this category.</p>}
            </div>
        </div>
    );
};

    const ModalWrapper = ({ title, children, maxWidth = 'max-w-md' }) => (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-6 w-full ${maxWidth} max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-lg animate-in fade-in slide-in-from-bottom-4 transition-colors duration-300`}>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <button onClick={() => setShowModal(null)} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
          </div>
          {children}
        </div>
      </div>
    );
    
const CustomSetlistModal = () => {
    // --- State for the Overhauled Modal ---
    const [step, setStep] = useState('details'); // 'details' or 'tracks'
    const [showLibrary, setShowLibrary] = useState(false);
    const [name, setName] = useState('');
    const [theme, setTheme] = useState('classic');
    const [tracklist, setTracklist] = useState([]); // Unified tracklist
    
    // --- Form state for composing a single song ---
    const [newSongName, setNewSongName] = useState('');
    const [newSongType, setNewSongType] = useState('Full Cast');

    // --- Define Costs ---
    const BASE_COST = 500000;
    const SONG_COST = 150000;
    const REUSE_COST = 25000; // Small fee for reusing a song
    const totalCost = BASE_COST + 
        tracklist.filter(t => t.origin === 'new').length * SONG_COST +
        tracklist.filter(t => t.origin === 'library').length * REUSE_COST;

    const themes = [
        { id: 'classic', name: 'Classic Idol' },
        { id: 'vocal', name: 'Vocal Focus' },
        { id: 'dance', name: 'Dance Focus' },
        { id: 'cool', name: 'Cool/Edgy' },
        { id: 'energy', name: 'High Energy' },
        { id: 'theatrical', name: 'Theatrical' },
    ];
    const songTypes = ['Full Cast', 'Unit (4-person)', 'Solo'];

    // --- Functions for Modal Logic ---
    const handleAddSong = () => {
        if (!newSongName.trim()) return setMessage("New song needs a name.");
        
        const newTrack = {
            id: `new-${Date.now()}-${Math.random()}`, // Temporary unique ID
            name: newSongName.trim(),
            type: newSongType,
            origin: 'new' // Mark as a newly composed song
        };
        setTracklist(prev => [...prev, newTrack]);
        setNewSongName(''); // Clear input
    };

    const handleAddFromLibrary = (song) => {
        const newTrack = {
            id: song.id, // Use the existing song ID
            name: song.name,
            type: song.type,
            origin: 'library' // Mark as a reused song
        };
        setTracklist(prev => [...prev, newTrack]);
    };

    const handleRemoveSong = (idToRemove) => {
        setTracklist(prev => prev.filter(track => track.id !== idToRemove));
    };
    
    const handleConfirmProduction = () => {
        if (!name.trim()) return setMessage("Setlist needs a name.");
        if (tracklist.length === 0) return setMessage("A custom setlist must have at least one song.");
        
        confirmCreateSetlist({
            name: name.trim(),
            theme,
            cost: totalCost,
            tracks: tracklist // Pass the unified tracklist
        });
    };

    const LibraryModal = () => {
        // Filter out songs already in the current tracklist
        const availableLibrarySongs = theaterSongs.filter(libSong => 
            !tracklist.some(track => track.id === libSong.id)
        );

        return (
            <ModalWrapper title="Theater Song Library" onBack={() => setShowLibrary(false)}>
                <div className="space-y-2 h-96 overflow-y-auto">
                    {availableLibrarySongs.length > 0 ? availableLibrarySongs.map(song => (
                        <div key={song.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center">
                            <div>
                                <p className="font-semibold dark:text-gray-200">{song.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{song.type}</p>
                            </div>
                            <button onClick={() => handleAddFromLibrary(song)} className="p-1 px-3 bg-blue-500 text-white rounded text-sm">
                                Add
                            </button>
                        </div>
                    )) : <p className="text-center text-gray-500 p-4">No other original theater songs available.</p>}
                </div>
            </ModalWrapper>
        );
    };

    // --- Render Logic ---
    if (showLibrary) {
        return <LibraryModal />;
    }

    const renderDetailsStep = () => (
        <>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Define the basic details of your new theater setlist. This will incur a significant base production cost.</p>
            <h4 className="font-semibold mb-1 dark:text-gray-200">Setlist Name</h4>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600" placeholder="e.g., 'A8 ~Mugen no Rasen~'"/>
            <h4 className="font-semibold mb-1 dark:text-gray-200">Theme/Concept</h4>
            <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600">
                {themes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
            <div className="p-3 bg-yellow-50 dark:bg-gray-900 rounded-lg border border-yellow-200 dark:border-gray-700 text-center mb-4">
                <p className="font-bold text-lg text-red-600 dark:text-yellow-300">Base Production Cost: ¥{BASE_COST.toLocaleString()}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Additional costs apply for each original or reused song.</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                <button onClick={() => setStep('tracks')} disabled={!name.trim()} className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400">Next: Build Tracklist</button>
            </div>
        </>
    );

    const renderTracksStep = () => (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
                    <div>
                        <h4 className="font-bold text-md mb-2 dark:text-gray-100">1. Compose New Original Song</h4>
                        <label className="text-sm font-semibold dark:text-gray-200">Song Name</label>
                        <div className="flex items-center gap-2 mb-2">
                            <input type="text" value={newSongName} onChange={(e) => setNewSongName(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600" placeholder="Leave blank for random..."/>
                            <button 
                                type="button" 
                                onClick={() => setNewSongName(generateRandomTheaterSongName())} 
                                className="p-2 rounded-md bg-pink-400 text-white hover:bg-pink-500 transition-colors" 
                                title="Generate Random Name"
                            >
                                <Shuffle size={20} />
                            </button>
                        </div>
                        <label className="text-sm font-semibold dark:text-gray-200">Song Type</label>
                        <select value={newSongType} onChange={(e) => setNewSongType(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600">
                            {songTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <button onClick={handleAddSong} className="w-full p-2 bg-green-500 text-white rounded font-bold"> Add New Song (+¥{SONG_COST.toLocaleString()})</button>
                    </div>
                    <div>
                        <h4 className="font-bold text-md mb-2 dark:text-gray-100">2. Add Existing Song</h4>
                        <button onClick={() => setShowLibrary(true)} className="w-full p-2 bg-blue-500 text-white rounded font-bold">Add from Library (+¥{REUSE_COST.toLocaleString()})</button>
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-md mb-2 dark:text-gray-100">Setlist Tracklist ({tracklist.length} songs)</h4>
                    <div className="space-y-2 border rounded p-2 h-64 overflow-y-auto bg-white dark:bg-gray-900">
                        {tracklist.length === 0 && <p className="text-center text-gray-500 p-4">Add songs to the setlist.</p>}
                        {tracklist.map((track, index) => (
                            <div key={track.id} className="p-2 bg-gray-100 dark:bg-gray-700 rounded flex justify-between items-center">
                                <div>
                                    <p className="font-semibold dark:text-gray-200">{`M${index + 1}: ${track.name}`}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Type: {track.type} <span className={`font-bold ${track.origin === 'new' ? 'text-green-500' : 'text-blue-500'}`}>({track.origin})</span></p>
                                </div>
                                <button onClick={() => handleRemoveSong(track.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600">
                <div className="flex justify-between items-center p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
                    <button onClick={() => setStep('details')} className="p-2 bg-gray-400 text-white rounded px-4 font-bold hover:bg-gray-500">Back</button>
                    <div className="text-right">
                        <p className="text-xl font-bold dark:text-gray-100">Total Production Cost: <span className={totalCost > money ? 'text-red-500' : 'text-green-500'}>¥{totalCost.toLocaleString()}</span></p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Your Balance: ¥{money.toLocaleString()}</p>
                    </div>
                    <button onClick={handleConfirmProduction} disabled={totalCost > money || tracklist.length === 0} className="p-3 bg-green-600 text-white rounded font-bold disabled:bg-gray-400">Produce Setlist</button>
                </div>
            </div>
        </>
    );

    return (
        <ModalWrapper title={<span className="flex items-center"><Plus size={20} className="mr-2"/> Create Custom Setlist</span>} maxWidth="max-w-4xl">
            {step === 'details' && renderDetailsStep()}
            {step === 'tracks' && renderTracksStep()}
        </ModalWrapper>
    );
};
    
    const HoldAuditionModal = ({ startAudition, groupName, sisterGroups, setShowModal }) => {
      const [targetGroup, setTargetGroup] = useState('main');
      const [tier, setTier] = useState(2);
      const [generationName, setGenerationName] = useState('');
  
      const handleConfirm = () => {
          if (!generationName.trim()) {
              // In a future step, we should show an error message here.
              // For now, just prevent the audition.
              return; 
          }
          startAudition(targetGroup, tier, generationName);
      };
  
      const tiers = [
          { id: 1, name: 'Local Casting', cost: 25000 },
          { id: 2, name: 'Regional Audition', cost: 100000 },
          { id: 3, name: 'National Audition', cost: 500000 },
          { id: 4, name: 'Elite Scouting', cost: 1500000 },
      ];
  
      return (
          <ModalWrapper title={<span className="flex items-center"><User size={20} className="mr-2"/> Hold Audition</span>} maxWidth="max-w-xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose the scale and target for your recruitment drive.</p>
              
              <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Target Group</h4>
              <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                  <option key="main" value="main">{groupName} (Main Group)</option>
                  {(sisterGroups || []).map(sg => <option key={sg.id} value={sg.id}>{sg.name}</option>)}
              </select>
              
              <h4 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Generation Name</h4>
              <input 
                  type="text" 
                  value={generationName} 
                  onChange={(e) => setGenerationName(e.target.value)}
                  className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                  placeholder="e.g., 17th Generation"
              />
  
              <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Audition Scale</h4>
              <div className="space-y-3">
                  {tiers.map(t => (
                      <label key={t.id} className={`p-3 border rounded-lg flex justify-between items-center cursor-pointer transition-colors duration-200 ${
                          tier === t.id ? 'bg-blue-100 border-blue-500 ring-2 ring-blue-200 dark:bg-gray-900 dark:border-blue-400' : 'bg-white dark:bg-gray-700 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{t.name}</span>
                          <span className="font-bold text-red-500 dark:text-red-400">¥{t.cost.toLocaleString()}</span>
                          <input
                              type="radio"
                              name="tier"
                              value={t.id}
                              checked={tier === t.id}
                              onChange={() => setTier(t.id)}
                              className="hidden"
                          />
                      </label>
                  ))}
              </div>
  
              <div className="flex justify-end gap-2 mt-6 pt-4 border-t dark:border-t-gray-700">
                  <button onClick={() => setShowModal(null)} className="p-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded px-4">Cancel</button>
                  <button onClick={handleConfirm} className="p-2 bg-green-500 text-white rounded px-4 font-bold">
                      Proceed to Draft
                  </button>
              </div>
          </ModalWrapper>
      );
  };
  const TraineeDraftModal = ({ auditionCandidates, modalData, confirmRecruitment, setShowModal }) => {
      const [selected, setSelected] = useState([]);
      const [sortBy, setSortBy] = useState({ key: 'potential', asc: false });
  
      if (!modalData) return null;
      const { contractFee } = modalData;
  
      const toggleSelection = (candidateId) => {
          setSelected(prev => {
              if (prev.includes(candidateId)) {
                  return prev.filter(id => id !== candidateId);
              }
              return [...prev, candidateId];
          });
      };
        const selectAll = () => {
          setSelected(auditionCandidates.map(c => c.id));
      };

      const deselectAll = () => {
          setSelected([]);
      };


      const handleSort = (key) => {
          setSortBy(prev => ({ key, asc: prev.key === key ? !prev.asc : false }));
      };
  
      const sortedCandidates = [...auditionCandidates].sort((a, b) => {
          if (a[sortBy.key] < b[sortBy.key]) return sortBy.asc ? -1 : 1;
          if (a[sortBy.key] > b[sortBy.key]) return sortBy.asc ? 1 : -1;
          return 0;
      });
  
      const handleConfirm = () => {
          const selectedTrainees = auditionCandidates.filter(c => selected.includes(c.id));
          confirmRecruitment(selectedTrainees, modalData);
      };
  
      const SortableHeader = ({ label, sortKey }) => (
          <th onClick={() => handleSort(sortKey)} className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
              {label} {sortBy.key === sortKey && (sortBy.asc ? '▲' : '▼')}
          </th>
      );
  
      return (
          <ModalWrapper title="Trainee Draft" maxWidth="max-w-4xl">
              <div className="mb-4 p-2 bg-blue-50 dark:bg-gray-700 rounded-lg text-sm">
                  <p>Hiring for: <span className="font-bold">{modalData.generationName}</span></p>
                  <p>Select candidates to sign. Each contract costs <span className="font-bold">¥{contractFee.toLocaleString()}</span>.</p>
              </div>
  
              <div className="max-h-[60vh] overflow-y-auto border dark:border-gray-600">
                  <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0">
                                <tr>
                                    <th className="p-2 w-10"></th>
                                    <SortableHeader label="Name" sortKey="name" />
                                    <SortableHeader label="Hometown" sortKey="hometown" />
                                    <SortableHeader label="Vo" sortKey="vocal" />
                                    <SortableHeader label="Da" sortKey="dance" />
                                    <SortableHeader label="Vi" sortKey="visual" />
                                    <SortableHeader label="Cha" sortKey="charisma" />
                                    <SortableHeader label="Int" sortKey="intelligence" />
                                    <SortableHeader label="Pot." sortKey="potential" />
                                    <SortableHeader label="Personality" sortKey="personality" />
                                </tr>
                            </thead>
                      <tbody>
                          {sortedCandidates.map(c => (
                              <tr key={c.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                  <td className="p-2 text-center">
                                      <input 
                                          type="checkbox" 
                                          checked={selected.includes(c.id)} 
                                          onChange={() => toggleSelection(c.id)}
                                      />
                                  </td>
                                  <td className="p-2 font-medium">{c.name}</td>
                                  <td className="p-2">{c.hometown}</td>
                                  <td className="p-2">{c.vocal}</td>
                                  <td className="p-2">{c.dance}</td>
                                  <td className="p-2">{c.visual}</td>
                                  <td className="p-2">{c.charisma}</td>
                                  <td className="p-2">{c.intelligence}</td>
                                  <td className="p-2 font-bold text-blue-600 dark:text-blue-400">{c.potential}</td>
                                  <td className="p-2">{c.personality}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
                <div className="flex gap-2 mb-2">
                    <button onClick={selectAll} className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded font-semibold hover:bg-blue-200">Select All</button>
                    <button onClick={deselectAll} className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300">Deselect All</button>
                </div>
              <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-600">
                  <div className="text-lg font-bold">
                      <span>{selected.length} Selected</span>
                      <span className="ml-4">Total Fee: <span className={money < (selected.length * contractFee) ? 'text-red-500' : 'text-green-500'}>¥{(selected.length * contractFee).toLocaleString()}</span></span>
                  </div>
                  <div className="flex gap-2">
                      <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                      <button onClick={handleConfirm} disabled={selected.length === 0 || money < (selected.length * contractFee)} className="p-2 bg-green-500 text-white rounded px-4 font-bold disabled:bg-gray-400">
                          Sign Selected Trainees
                      </button>
                  </div>
              </div>
          </ModalWrapper>
      );
  };
  

const ElectionSummaryModal = ({ modalData, onHide, getMemberGroupStatus, groupName, sisterGroups }) => {
    const { participating, nonParticipating, onConfirm } = modalData;
    const [rankedSpots, setRankedSpots] = React.useState('80');

    const rankOptions = [16, 32, 48, 64, 80];

    React.useEffect(() => {
        if (participating && participating.length > 0) {
            const highestTier = rankOptions.slice().reverse().find(tier => tier <= participating.length);
            setRankedSpots(String(highestTier || rankOptions[0]));
        }
    }, [participating]);

    const groupMembersByTeam = (members) => {
        return members.reduce((acc, current) => {
            const member = current.member || current;
            const groupStatus = getMemberGroupStatus(member);
            if (!acc[groupStatus]) {
                acc[groupStatus] = [];
            }
            acc[groupStatus].push(current);
            return acc;
        }, {});
    };

    const groupedParticipating = groupMembersByTeam(participating);
    const groupedNonParticipating = groupMembersByTeam(nonParticipating);
    const sortedParticipatingGroups = Object.entries(groupedParticipating).sort((a, b) => a[0].localeCompare(b[0]));
    const sortedNonParticipatingGroups = Object.entries(groupedNonParticipating).sort((a, b) => a[0].localeCompare(b[0]));


    if (!participating) return null;

    return (
        <div className="fixed inset-0 bg-pink-300/10 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="bg-gradient-to-br from-white via-pink-50 to-blue-50 dark:from-gray-800 dark:via-gray-800 dark:to-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col text-gray-800 dark:text-gray-100 border-2 border-white dark:border-slate-700">
                <div className="p-6 border-b border-pink-200/80 dark:border-slate-700/80">
                    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500 tracking-tight">General Election Summary</h2>
                    <p className="text-center text-pink-400/90 dark:text-pink-300/90 mt-1">Confirm members and settings before starting the election!</p>
                </div>

                <div className="p-6 flex-grow overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Participating Members */}
                    <div className="bg-green-100/30 dark:bg-green-500/10 p-4 rounded-xl border border-green-200/80 dark:border-green-500/20">
                        <h3 className="font-bold text-lg text-green-700 dark:text-green-300 mb-3 border-b border-green-500/20 pb-2">
                            Participating Members ({participating.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                           {sortedParticipatingGroups.map(([groupName, members]) => (
                               <div key={groupName}>
                                   <h4 className="font-semibold text-xs uppercase text-green-600 dark:text-green-400 tracking-wider bg-green-100 dark:bg-green-900/30 p-1 rounded-md">{groupName}</h4>
                                   <div className="pl-2 mt-1 space-y-1">
                                       {members.map(member => (
                                            <div key={member.rosterId || member.id} className="text-sm p-1.5 bg-white/50 dark:bg-slate-700/30 rounded-md">{member.name}</div>
                                       ))}
                                   </div>
                               </div>
                           ))}
                        </div>
                    </div>

                    {/* Non-Participating Members */}
                    <div className="bg-red-100/30 dark:bg-red-500/10 p-4 rounded-xl border border-red-200/80 dark:border-red-500/20">
                        <h3 className="font-bold text-lg text-red-700 dark:text-red-300 mb-3 border-b border-red-500/20 pb-2">
                            Non-Participating Members ({nonParticipating.length})
                        </h3>
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                           {sortedNonParticipatingGroups.length > 0 ? sortedNonParticipatingGroups.map(([groupName, membersWithReason]) => (
                               <div key={groupName}>
                                   <h4 className="font-semibold text-xs uppercase text-red-600 dark:text-red-400 tracking-wider bg-red-100 dark:bg-red-900/30 p-1 rounded-md">{groupName}</h4>
                                   <div className="pl-2 mt-1 space-y-1">
                                       {membersWithReason.map(({ member, reason }) => (
                                            <div key={member.rosterId || member.id} className="text-sm p-1.5 bg-white/50 dark:bg-slate-700/30 rounded-md">
                                                <span className="font-semibold">{member.name}</span>
                                                <span className="text-gray-500 dark:text-gray-400 text-xs"> - {reason}</span>
                                            </div>
                                       ))}
                                   </div>
                               </div>
                           )) : <p className="text-gray-500 italic text-sm p-2">All eligible members are participating.</p>}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-pink-200/80 dark:border-slate-700/80 flex justify-between items-center bg-white/50 dark:bg-slate-800/20">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Election Cost: <span className="font-semibold text-pink-500 dark:text-pink-400">¥5,000</span></p>
                    <div className="flex items-center gap-4">
                        <div>
                            <label htmlFor="rank-spots" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ranked Spots:</label>
                            <select
                                id="rank-spots"
                                value={rankedSpots}
                                onChange={(e) => setRankedSpots(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-pink-400 focus:border-pink-400 sm:text-sm rounded-md"
                            >
                                {rankOptions.map(opt => (
                                    <option key={opt} value={opt} disabled={opt > participating.length}>
                                        Top {opt}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => onConfirm(Number(rankedSpots))} className="self-end px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-500 text-white rounded-lg font-bold hover:from-pink-500 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/20 dark:shadow-blue-500/10">
                            Confirm & Begin
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


const ElectionResultModal = () => {
    const { rankedMembers, electionYear, trivia, spots } = modalData;

    // This is the main fix: Only use the members within the selected rank spots.
    const membersToReveal = rankedMembers.slice(0, spots);

    const [revealIndex, setRevealIndex] = useState(0);
    const [revealedRanks, setRevealedRanks] = useState([]);
    const [currentMember, setCurrentMember] = useState(null);
    const [infoPanelVisible, setInfoPanelVisible] = useState(false);
    const [displayVotes, setDisplayVotes] = useState(0);
    const containerRef = useRef(null);

    // Particle effect with more transparent particles
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const createParticle = () => {
            const particle = document.createElement('div');
            const emojis = ['✨', '💖', '🌸', '🎀', '⭐'];
            particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            particle.className = 'particle-float';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.transform = `scale(${Math.random() * 0.6 + 0.8})`;
            particle.style.animationDuration = `${Math.random() * 4 + 3}s`;
            // More transparent particles
            particle.style.opacity = Math.random() * 0.3 + 0.2; 
            container.appendChild(particle);
            setTimeout(() => particle.remove(), 7000);
        };
        const interval = setInterval(createParticle, 200);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!currentMember) return;
        const targetVotes = currentMember.votes;
        let currentDisplay = 0;
        const interval = setInterval(() => {
            if (currentDisplay < targetVotes) {
                currentDisplay += Math.ceil((targetVotes - currentDisplay) / 10);
                if (currentDisplay > targetVotes) currentDisplay = targetVotes;
                setDisplayVotes(currentDisplay);
            } else {
                clearInterval(interval);
            }
        }, 30);
        return () => clearInterval(interval);
    }, [currentMember]);

    const revealNextRank = () => {
        if (revealIndex >= membersToReveal.length) return;
        const memberToReveal = membersToReveal[membersToReveal.length - 1 - revealIndex];
        const rank = membersToReveal.length - revealIndex;

        setCurrentMember({ ...memberToReveal, rank });
        setInfoPanelVisible(false);
        setTimeout(() => {
            setRevealedRanks(prev => [{ ...memberToReveal, rank }, ...prev]);
            setInfoPanelVisible(true);
        }, 300);
        setRevealIndex(prev => prev + 1);
    };

    const getButtonText = () => {
        if (revealIndex >= membersToReveal.length) return "ELECTION COMPLETE";
        const nextRank = membersToReveal.length - revealIndex;
        if (nextRank === 1) return "👑 REVEAL CENTER (#1) 👑";
        if (nextRank <= 7) return `✨ REVEAL KAMI 7 (#${nextRank}) ✨`;
        return `REVEAL RANK #${nextRank}`;
    };

    const RankChangeArrow = ({ member }) => {
        if (!member) return null;
        const oldRank = member.previousRank;
        const newRank = member.rank;
        const hadPreviousRankings = (member.electionHistory || []).length > 0;

        if (oldRank === 999 || !oldRank) {
            return hadPreviousRankings 
                ? <span className="text-purple-500 font-bold">Re-Entry</span> 
                : <span className="text-cyan-500 font-bold">New Entry</span>;
        }
        if (newRank < oldRank) return <span className="text-green-500 font-bold flex items-center">▲{oldRank - newRank}</span>;
        if (newRank > oldRank) return <span className="text-red-500 font-bold flex items-center">▼{newRank - oldRank}</span>;
        return <span className="text-gray-400 font-bold">-</span>;
    };

    return (
        <div ref={containerRef} className="fixed inset-0 bg-pink-100/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-in fade-in overflow-hidden">
            <style jsx>{`
                .particle-float { position: absolute; top: 100%; pointer-events: none; animation: floatUpAndFade 7s linear forwards; font-size: 1.5rem; }
                @keyframes floatUpAndFade { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }
            `}</style>
            
            <div className="w-full max-w-4xl h-full sm:h-auto sm:max-h-[90vh] bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border border-white/50 dark:border-slate-700/50 rounded-2xl shadow-2xl flex flex-col relative z-10">
                <div className="p-3 sm:p-4 flex justify-between items-center font-extrabold text-xs tracking-widest text-pink-500 dark:text-pink-300 border-b-4 border-pink-300 dark:border-pink-500 bg-white/80 dark:bg-slate-800/80 rounded-t-2xl">
                    <span>{electionYear} GENERAL ELECTION</span>
                    <span className="text-gray-400 dark:text-gray-500">OFFICIAL RESULTS</span>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-[256px,1fr] flex-1 overflow-hidden">
                    <div className="w-full flex-shrink-0 h-40 md:h-auto border-b md:border-b-0 md:border-r border-gray-200 dark:border-slate-700 bg-gray-100/50 dark:bg-slate-900/50 overflow-y-auto">
                        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 p-2">
                            {revealedRanks.slice().map(member => (
                                <div key={member.rosterId} className={`p-2 bg-white/80 dark:bg-slate-700/50 shadow-sm flex justify-between items-center border-l-4 rounded-md ${member.rank === 1 ? 'border-yellow-400' : member.rank <= 7 ? 'border-pink-400' : 'border-blue-400'}`}>
                                    <div>
                                        <p className="font-black text-pink-500 dark:text-pink-400 text-sm">#{member.rank} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">({(getMemberGroupStatus(member) || '').split(' | ')[0]})</span></p>
                                        <p className="font-semibold text-xs truncate text-gray-700 dark:text-gray-200">{member.name}</p>
                                    </div>
                                    <RankChangeArrow member={member} />
                                </div>
                            ))}
                        </div>
                        {revealIndex >= membersToReveal.length && trivia && trivia.length > 0 && (
                            <div className="p-3 mt-2 border-t border-gray-200 dark:border-slate-700">
                                <h4 className="font-bold text-sm mb-2 text-gray-800 dark:text-gray-200">Election Trivia</h4>
                                <ul className="list-disc list-inside text-xs space-y-2 text-gray-600 dark:text-gray-300">
                                    {trivia.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="relative flex-1 flex flex-col items-center justify-center p-4 min-h-[400px]">
                        {revealIndex >= membersToReveal.length ? (
                            <button onClick={() => setShowModal(null)} className="absolute top-4 right-4 px-6 py-3 bg-gray-400/80 text-white rounded-full font-bold shadow-lg transition-all hover:bg-gray-500/80">Close</button>
                        ) : (
                            <button onClick={revealNextRank} disabled={revealIndex >= membersToReveal.length} className="absolute top-4 right-4 px-6 py-3 bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-full font-bold shadow-lg transition-all hover:shadow-xl disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-400 disabled:shadow-none">
                                {getButtonText()}
                            </button>
                        )}
                        
                        <div className={`absolute inset-0 flex items-center justify-center p-4 pointer-events-none`}>
                            <div className={`transition-all duration-500 ${infoPanelVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                <p className="p-6 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm rounded-2xl shadow-lg max-w-md text-center text-xl italic text-gray-800 dark:text-gray-200 pointer-events-auto">
                                    "{currentMember?.speech}"
                                </p>
                            </div>
                        </div>

                        <div className={`absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-700/90 backdrop-blur-md border-t-4 border-pink-300 dark:border-pink-500 p-4 rounded-xl shadow-xl transition-transform duration-500 ${infoPanelVisible ? 'translate-y-0' : 'translate-y-48'}`}>
                            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tighter text-pink-500 dark:text-pink-300">{currentMember?.name || '...'}</h2>
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-bold text-lg sm:text-xl text-blue-500 dark:text-blue-400">#{currentMember?.rank}</span>
                                            <RankChangeArrow member={currentMember} />
                                        </div>
                                    </div>
<span className="text-[11px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 tracking-widest">
    {currentMember ? getMemberGroupStatus(currentMember) : '...'}
</span>
                                </div>
                                <div className="text-left sm:text-right mt-2 sm:mt-0">
                                    <div className="text-2xl sm:text-3xl font-black text-blue-500 dark:text-blue-400 font-mono">{displayVotes.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400 font-bold tracking-wider">TOTAL VOTES</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const AnnualAwardsResultModal = () => {
    if (!modalData) return null;
    const [revealStep, setRevealStep] = useState(0); // 0: Start, 1: Rookie, 2: Song, 3: Idol

    const revealNext = () => setRevealStep(prev => prev + 1);

    const AwardCard = ({ title, icon: Icon, color, winnerData, metricField, unit, delayClass, isRevealed, isMainEvent }) => {
        if (!isRevealed) return (
            <div className="h-[105px] bg-black/20 rounded-lg flex items-center justify-center">
                 <p className="text-gray-600 animate-pulse">Waiting for announcement...</p>
            </div>
        );

        return (
            <div className={`opacity-0 ${delayClass} bg-black bg-opacity-20 p-4 rounded-lg border ${isMainEvent ? 'border-2 border-yellow-400 shadow-lg shadow-yellow-500/20' : 'border-yellow-500/30'}`}>
                <h3 className={`text-xl font-bold ${color} flex items-center mb-2`}>
                    <Icon className="mr-3 h-6 w-6" /> {title}
                </h3>
                {winnerData ? (
                    <div className="text-center py-2">
                        <p className={`text-2xl font-light ${winnerData.isRival ? 'text-gray-400 italic' : 'text-white'}`}>{winnerData.name}</p>
                        <p className="text-sm text-gray-400">
                            {winnerData.isRival 
                                ? `(${winnerData.group})` 
                                : `from ${winnerData.group}`
                            }
                            {metricField && !winnerData.isRival &&
                                <span className="ml-2 font-mono">({(winnerData[metricField] || 0).toLocaleString()}{unit})</span>
                            }
                        </p>
                    </div>
                ) : (
                    <p className="text-lg text-center py-2 text-gray-500">No eligible winner this year.</p>
                )}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex justify-center items-center z-50 p-4">
          <div 
            className="bg-gradient-to-b from-red-900 via-gray-900 to-gray-900 border-4 border-yellow-500 rounded-lg shadow-2xl w-full max-w-2xl text-white overflow-hidden"
            style={{boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'}}
          >
            {/* Header */}
            <div className="p-6 text-center bg-black bg-opacity-20 border-b-4 border-yellow-600">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 tracking-wider">
                🏆 {modalData.year} Annual Idol Grand Prix 🏆
              </h2>
              <p className="text-yellow-200 opacity-80 mt-1">And the winners are...</p>
            </div>

            {/* Awards Presentation */}
            <div className="px-8 py-6 space-y-5 min-h-[360px]">
              <AwardCard 
                title="Rookie of the Year"
                icon={Sparkles}
                color="text-pink-400"
                winnerData={modalData.rookieOfTheYear}
                metricField="fans"
                unit=" fans"
                isRevealed={revealStep >= 1}
                delayClass="animate-fade-in-delay-1"
              />
              <AwardCard 
                title="Song of the Year"
                icon={FileText}
                color="text-blue-400"
                winnerData={modalData.songOfTheYear}
                metricField="sales"
                unit=" copies"
                isRevealed={revealStep >= 2}
                delayClass="animate-fade-in-delay-1"
              />
              <AwardCard 
                title="Idol of the Year"
                icon={Trophy}
                color="text-yellow-300"
                winnerData={modalData.idolOfTheYear}
                metricField="fans"
                unit=" fans"
                isRevealed={revealStep >= 3}
                delayClass="animate-fade-in-delay-1"
                isMainEvent={true}
              />
            </div>
            
            {/* Footer Button */}
            <div className="p-4 bg-black bg-opacity-20 mt-4 border-t border-yellow-600/50 flex justify-center h-[68px]">
              <button
                onClick={revealStep < 3 ? revealNext : () => setShowModal(null)}
                className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-3 px-12 rounded-lg shadow-lg transform hover:scale-105 transition-all"
              >
                {revealStep === 0 && 'Reveal Rookie of the Year'}
                {revealStep === 1 && 'Reveal Song of the Year'}
                {revealStep === 2 && 'And the Idol of the Year is...'}
                {revealStep >= 3 && 'Finish'}
              </button>
            </div>
          </div>
        </div>
    );
};


    const CreateSongModal = () => {
    
    // This is the new component for our drag overlay
    const DragOverlayChip = ({ member }) => {
        if (!member) return null;
        return (
            <div className="p-1 rounded text-center cursor-grabbing transition-all duration-200 bg-yellow-400 text-black ring-2 ring-yellow-200 shadow-xl">
                <div className="flex flex-col items-center leading-tight" style={{ userSelect: 'none' }}>
                    <span className="font-semibold text-[11px]">{member.nickname || member.name.split(' ')[0]}</span>
                        <span className="text-[10px] text-gray-800">
                            Vo:{Math.round(member.singing)} Da:{Math.round(member.dancing)} Vi:{Math.round(member.visual)} Ch:{Math.round(member.charisma)} In:{Math.round(member.intelligence)}
                        </span>
                    <span className="text-[10px] text-blue-700 font-medium">
                        Fans: {getTotalFansForMember(member).toLocaleString()}
                    </span>
                </div>
            </div>
        );
    };


    // --- Basic Song State ---
    const { targetGroupId, songs, sisterGroups } = modalData;    
    const allGroups = [{ id: 'main', name: groupName, isSister: false }, ...(sisterGroups || []).map(sg => ({ id: sg.id, name: sg.name, isSister: true }))];
    const [targetGroup, setTargetGroup] = useState(targetGroupId || allGroups[0].name);
    const [songName, setSongName] = useState('');
    const [tracks, setTracks] = useState([
        { name: 'Title Track', unitName: 'Senbatsu', type: 'title', members: [], center: null, lineup: {} },
        { name: 'B-Side 1', unitName: 'Universe Girls', type: 'b-side', members: [], center: null, lineup: {}, cdType: 'common' }
    ]);
    const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

    // --- UI/Filter State ---
    const [filterKey, setFilterKey] = useState('All');
    const [showOnlyUnchosen, setShowOnlyUnchosen] = useState(false);
    // --- Production and Scheduling State ---
    const [step, setStep] = useState('type'); // 'type', 'selection', or 'production'
    const [releaseType, setReleaseType] = useState(null); // 'single' or 'album'
    const [albumName, setAlbumName] = useState('New Album');
    const [albumTracks, setAlbumTracks] = useState([]);
    const [selectedAlbumTrackIndex, setSelectedAlbumTrackIndex] = useState(0);

    const [releaseWeek, setReleaseWeek] = useState(week + 4);
    const [productionChoices, setProductionChoices] = useState({
        training: 'standard', song: 'inHouse', mv: 'none', outfits: 'existing', promo: 'none'
    });

    const [releaseFormat, setReleaseFormat] = useState('digital');
    const [draggingMember, setDraggingMember] = useState(null);
    const [physicalVersions, setPhysicalVersions] = useState(1);
    const [isElectionSingle, setIsElectionSingle] = useState(false);
    const [includeHandshakeTickets, setIncludeHandshakeTickets] = useState(false);

    const generateUniqueRandomName = () => {
        const allSongNames = [
            ...(songs || []).map(s => s.name),
            ...(sisterGroups || []).flatMap(sg => (sg.songs || []).map(s => s.name))
        ];
        const usedNames = new Set(allSongNames);
        
        // Try up to 20 times to find a unique name
        for (let i = 0; i < 20; i++) {
            const newName = generateSongTitle(); // This calls our new global function
            if (!usedNames.has(newName)) {
                return newName;
            }
        }
        // If it can't find a unique one, just return a random one
        return generateSongTitle();
    };


        const baseCostPerVersion = 100000;
        const baseCostAlbum = 800000; // Base cost for producing a full album
        const electionBallotCost = 200000;
        const handshakeTicketCost = 300000;
        const albumPhysicalSurcharge = 200000; // Fixed additional cost for physical albums

        const productionChoicesCost = Object.keys(productionChoices).reduce((total, key) => total + productionTiers[key][productionChoices[key]].cost, 10000);

        const totalProductionCost = 
            productionChoicesCost + 
            (
                releaseType === 'album' 
                    ? baseCostAlbum + (releaseFormat === 'physical' ? albumPhysicalSurcharge : 0)
                    : (releaseFormat === 'physical' ? baseCostPerVersion * physicalVersions : 0)
            ) + 
            (isElectionSingle ? electionBallotCost : 0) + (includeHandshakeTickets ? handshakeTicketCost : 0);

            const handleRandomizeRows = () => {
                const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
                const updateFn = (prevTracks) => prevTracks.map((track, index) => {
                    if (index !== currentIndex) return track;
    
                    const members = [...track.members];
                    const centerId = track.center;
                    const nonCenterMembers = members.filter(id => String(id) !== String(centerId));
                    const shuffled = nonCenterMembers.sort(() => 0.5 - Math.random());
                    const newLineup = {};
                    if (centerId) newLineup[centerId] = '1st Row';
    
                    shuffled.forEach((id, i) => {
                        if (i < 5) newLineup[id] = '2nd Row';
                        else if (i < 10) newLineup[id] = '3rd Row';
                        else if (i < 16) newLineup[id] = '4th Row';
                        else newLineup[id] = '5th Row';
                    });
                    return { ...track, lineup: newLineup };
                });
                if (releaseType === 'album') setAlbumTracks(updateFn);
                else setTracks(updateFn);
            };

            const handleSelectByAvgSkill = (trackIndex, numToSelect) => {
                const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
                const allTracks = releaseType === 'album' ? albumTracks : tracks;
                
                const allChosenMemberIds = new Set(allTracks.flatMap(t => t.members.map(String)));
                const unchosenPool = visibleRoster.filter(m => !allChosenMemberIds.has(String(m.id)));

                if (unchosenPool.length === 0) return;

                // Sort by the average of singing and dancing skill
                unchosenPool.sort((a, b) =>
                    (((b.singing || 0) + (b.dancing || 0) + (b.visual || 0)) / 3) -
                    (((a.singing || 0) + (a.dancing || 0) + (a.visual || 0)) / 3)
                );

                const num = Math.min(numToSelect, unchosenPool.length);
                const selectedIds = unchosenPool.slice(0, num).map(m => String(m.id));

                const updateFn = (prevTracks) => prevTracks.map((track, index) => {
                    if (index !== currentIndex) return track;

                    const newMembers = [...new Set([...track.members, ...selectedIds])];
                    const newLineup = { ...track.lineup };
                    selectedIds.forEach(id => { if (!newLineup[id]) newLineup[id] = '5th Row'; });
                    return { ...track, members: newMembers, lineup: newLineup };
                });

                if (releaseType === 'album') {
                    setAlbumTracks(updateFn);
                } else {
                    setTracks(updateFn);
                }
            };


            const handleRandomizeByFans = (trackIndex, numToSelect) => {
            // This is the fix: We get the REAL current index here...
            const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
            // ... and ignore the 'trackIndex' argument that was causing the bug.

            const allTracks = releaseType === 'album' ? albumTracks : tracks;
            
            const allChosenMemberIds = new Set(allTracks.flatMap(t => t.members.map(String)));
            const unchosenPool = visibleRoster.filter(m => !allChosenMemberIds.has(String(m.id)));

            if (unchosenPool.length === 0) return;

            unchosenPool.sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a));

            const num = Math.min(numToSelect, unchosenPool.length);
            const selectedIds = unchosenPool.slice(0, num).map(m => String(m.id));

            const updateFn = (prevTracks) => prevTracks.map((track, index) => {
                // We use the REAL current index to find the correct track to modify.
                if (index !== currentIndex) return track;

                const newMembers = [...new Set([...track.members, ...selectedIds])];
                const newLineup = { ...track.lineup };
                selectedIds.forEach(id => { if (!newLineup[id]) newLineup[id] = '5th Row'; });
                return { ...track, members: newMembers, lineup: newLineup };
            });

            if (releaseType === 'album') setAlbumTracks(updateFn);
            else setTracks(updateFn);
        };

    const handleRankRowsByAvgSkill = () => {
        const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
        const updateFn = (prevTracks) => prevTracks.map((track, index) => {
            if (index !== currentIndex || !track.members || track.members.length === 0) return track;

            const trackMembers = track.members.map(id => selectableMembers.find(m => String(m.id) === String(id))).filter(Boolean);
            const centerId = track.center ? String(track.center) : null;
            const membersToRank = trackMembers.filter(m => String(m.rosterId || m.id) !== centerId);

            // Sort by the average of singing and dancing skill
            membersToRank.sort((a, b) =>
                    (((b.singing || 0) + (b.dancing || 0) + (b.visual || 0)) / 3) -
                    (((a.singing || 0) + (a.dancing || 0) + (a.visual || 0)) / 3)
            );

            const newLineup = { ...track.lineup };
            const totalToRank = membersToRank.length;
            const secondRowSize = Math.ceil(totalToRank * 0.3);
            const thirdRowSize = Math.floor(totalToRank * 0.4);

            membersToRank.forEach((member, memberIndex) => {
                const memberIdStr = String(member.rosterId || member.id);
                if (memberIndex < secondRowSize) newLineup[memberIdStr] = '2nd Row';
                else if (memberIndex < secondRowSize + thirdRowSize) newLineup[memberIdStr] = '3rd Row';
                else newLineup[memberIdStr] = '4th Row';
            });
            
            if (centerId) newLineup[centerId] = '1st Row';

            return { ...track, lineup: newLineup };
        });

        if (releaseType === 'album') {
            setAlbumTracks(updateFn);
        } else {
            setTracks(updateFn);
        }
    };
   
        const handleRankRowsByFans = () => {
        const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
        const updateFn = (prevTracks) => prevTracks.map((track, index) => {
            if (index !== currentIndex || !track.members || track.members.length === 0) return track;

            const trackMembers = track.members.map(id => selectableMembers.find(m => String(m.id) === String(id))).filter(Boolean);

            const centerId = track.center ? String(track.center) : null;
            const membersToRank = trackMembers.filter(m => String(m.rosterId || m.id) !== centerId);

            membersToRank.sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a));

            const newLineup = { ...track.lineup };
            const totalToRank = membersToRank.length;
            const secondRowSize = Math.ceil(totalToRank * 0.3);
            const thirdRowSize = Math.floor(totalToRank * 0.4);

            membersToRank.forEach((member, memberIndex) => {
                const memberIdStr = String(member.rosterId || member.id);
                if (memberIndex < secondRowSize) newLineup[memberIdStr] = '2nd Row';
                else if (memberIndex < secondRowSize + thirdRowSize) newLineup[memberIdStr] = '3rd Row';
                else newLineup[memberIdStr] = '4th Row';
            });
            
            if (centerId) newLineup[centerId] = '1st Row';

            return { ...track, lineup: newLineup };
        });

        if (releaseType === 'album') setAlbumTracks(updateFn);
        else setTracks(updateFn);
    };



        const historicalTracks = [
            ...(songs || []).flatMap(release =>
                (release.tracks || []).map(track => ({
                    id: `${release.id}-${track.name}-${release.targetGroup}`,
                    name: `${track.name} (from ${release.name})`,
                    data: {
                        members: (track.members || []).map(m => String(m.id)),
                        center: track.center || [],
                        lineup: track.lineup || {}
                    }
                }))
            ),
            ...(sisterGroups || []).flatMap(sg =>
                (sg.songs || []).flatMap(release =>
                    (release.tracks || []).map(track => ({
                        id: `${release.id}-${track.name}-${sg.id}`,
                        name: `${track.name} (from ${sg.name}'s ${release.name})`,
                        data: {
                            members: (track.members || []).map(m => String(m.id)),
                            center: track.center ? String(track.center) : null,
                            lineup: track.lineup || {}
                        }
                    }))
                )
            )
        ].sort((a, b) => {
            const idA = parseInt(a.id.split('-')[0], 10);
            const idB = parseInt(b.id.split('-')[0], 10);
            if (idB !== idA) return idB - idA;
            return a.name.localeCompare(b.name);
        }).slice(0, 10);

    const applyPreviousLineup = (trackId) => {

        if (String(trackId) === 'janken-senbatsu') {
            if (!lastJankenResult) return;

            const minRank = 1;
            const maxRank = 16;

            const unitMembers = lastJankenResult
                .filter(m => m.rank >= minRank && m.rank <= maxRank)
                .sort((a, b) => a.rank - b.rank);

            if (unitMembers.length === 0) return;

            const newMemberIds = unitMembers.map(m => String(m.rosterId || m.id));
            const centerMember = unitMembers.find(m => m.rank === 1);
            const newCenterIds = centerMember ? [String(centerMember.rosterId || centerMember.id)] : [];
            const newHotlineup = {};

            unitMembers.forEach(member => {
                const memberId = String(member.rosterId || member.id);
                const rank = member.rank;

                if (rank === 1) { // Rank 1
                    newHotlineup[memberId] = '1st Row';
                } else if (rank <= 3) { // Ranks 2-3
                    newHotlineup[memberId] = '2nd Row';
                } else if (rank <= 7) { // Ranks 4-7
                    newHotlineup[memberId] = '3rd Row';
                } else if (rank <= 11) { // Ranks 8-11
                    newHotlineup[memberId] = '4th Row';
                } else { // Ranks 12-16
                    newHotlineup[memberId] = '5th Row';
                }
            });

            const updateFn = (prevTracks) => prevTracks.map((track, index) => {
                const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
                if (index !== currentIndex) return track;
                return { ...track, members: newMemberIds, center: newCenterIds, lineup: newHotlineup };
            });

            if (releaseType === 'album') {
                setAlbumTracks(updateFn);
            } else {
                setTracks(updateFn);
            }

            const singleDropdown = document.getElementById('import-lineup');
            const albumDropdown = document.getElementById('import-lineup-album');
            if(singleDropdown) singleDropdown.value = "";
            if(albumDropdown) albumDropdown.value = "";
            
            return;
        }
    
        if (String(trackId).startsWith('election-')) {
            const unit = String(trackId).replace('election-', '');
            if (!lastElectionResult) return;
    
            const rankRanges = {
                senbatsu: { min: 1, max: 16 },
                undergirls: { min: 17, max: 32 },
                nextgirls: { min: 33, max: 48 },
                futuregirls: { min: 49, max: 64 },
                upcominggirls: { min: 65, max: 80 },
            };
    
            const range = rankRanges[unit];
            if (!range) return;
    
            const unitMembers = lastElectionResult.filter(m => m.rank >= range.min && m.rank <= range.max);
    
            const newMemberIds = unitMembers.map(m => m.rosterId || m.id);
            let newCenterIds = [];
            const newHotlineup = {};
    
            unitMembers.forEach(member => {
                const relativeRank = member.rank - range.min + 1;
                const memberId = String(member.rosterId || member.id);
    
                if (relativeRank === 1) {
                    newCenterIds = [memberId];
                    newHotlineup[memberId] = '1st Row';
                } else if (relativeRank <= 3) {
                    newHotlineup[memberId] = '2nd Row';
                } else if (relativeRank <= 7) {
                    newHotlineup[memberId] = '3rd Row';
                } else if (relativeRank <= 11) {
                    newHotlineup[memberId] = '4th Row';
                } else {
                    newHotlineup[memberId] = '5th Row';
                }
            });
    
            const updateFn = (prevTracks) => prevTracks.map((track, index) => {
                const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
                if (index !== currentIndex) return track;
                return { ...track, members: newMemberIds, center: newCenterIds, lineup: newHotlineup };
            });
    
            if (releaseType === 'album') {
                setAlbumTracks(updateFn);
            } else {
                setTracks(updateFn);
            }
    
            const singleDropdown = document.getElementById('import-lineup');
            const albumDropdown = document.getElementById('import-lineup-album');
            if(singleDropdown) singleDropdown.value = "";
            if(albumDropdown) albumDropdown.value = "";
            
            return;
        }


        if (!trackId) return;

        // Find the historical data
        const selectedHistory = historicalTracks.find(t => t.id === trackId);
        if (!selectedHistory) return;

        const { members: historicMemberIds, center: historicCenterId, lineup: historicLineup } = selectedHistory.data;

        // Get all currently available members for this release
        const availableMemberIds = new Set(selectableMembers.map(m => String(m.rosterId || m.id)));

        // Filter the old lineup to only include currently available members
        const newMemberIds = historicMemberIds.filter(id => availableMemberIds.has(String(id)));
        
        // Validate the center
        const newCenterIds = [].concat(historicCenterId || []).filter(id => availableMemberIds.has(String(id)));

        // Clean the lineup object, removing any members who are no longer available
        const newHotlineup = Object.keys(historicLineup).reduce((acc, key) => {
            if (newMemberIds.includes(String(key))) {
                acc[key] = historicLineup[key];
            }
            return acc;
        }, {});

        // Update the state for the currently selected track
        const updateFn = (prevTracks) => prevTracks.map((track, index) => {
            const currentIndex = releaseType === 'album' ? selectedAlbumTrackIndex : selectedTrackIndex;
            if (index !== currentIndex) return track;

            // Overwrite the lineup completely with the imported data
            return {
                ...track,
                members: newMemberIds,
                center: newCenterIds,
                lineup: newHotlineup
            };
        });

        if (releaseType === 'album') {
            setAlbumTracks(updateFn);
        } else {
            setTracks(updateFn);
        }

        // Reset dropdown to default after selection
        const singleDropdown = document.getElementById('import-lineup');
        const albumDropdown = document.getElementById('import-lineup-album');
        if(singleDropdown) singleDropdown.value = "";
        if(albumDropdown) albumDropdown.value = "";
    };


            useEffect(() => {
            // This effect automatically calculates the number of physical versions
            // needed based on the B-side track assignments for SINGLES.
            if (releaseFormat === 'physical' && releaseType === 'single') {
                const exclusiveTypes = new Set(
                    tracks
                        .filter(t => t.type === 'b-side' && t.cdType !== 'common')
                        .map(t => t.cdType)
                );
                const numVersions = exclusiveTypes.size;
                setPhysicalVersions(Math.max(1, numVersions));
            }
        }, [tracks, releaseFormat, releaseType]);

    // --- Functions ---
    const handleProductionChange = (category, value) => setProductionChoices(prev => ({ ...prev, [category]: value }));
    const updateTrackName = (index, newName) => setTracks(prev => prev.map((track, i) => i === index ? { ...track, name: newName } : track));
    const updateUnitName = (index, newUnitName) => setTracks(prev => prev.map((track, i) => i === index ? { ...track, unitName: newUnitName } : track));
    const updateTrackCDType = (index, newType) => setTracks(prev => prev.map((track, i) => i === index ? { ...track, cdType: newType } : track));
    
        const sensors = useSensors(
        useSensor(PointerSensor, {
            // For mouse: require the mouse to move 5 pixels before activating a drag
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor, {
            // For touch: require a 250ms press delay to start a drag
            activationConstraint: {
                delay: 250,
                tolerance: 5, // User can move their finger 5px during the delay
            },
        })
    );


    const [activeDragId, setActiveDragId] = useState(null);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveDragId(active.id);
        // Find the member once and store it in state to prevent lookups on every frame
        setDraggingMember(getMemberById(active.id));
    };

    const handleDragEnd = (event) => {
        setActiveDragId(null);
        setDraggingMember(null); // Clear the dragging member from state
        const { active, over } = event;

        if (over && active.id !== over.id) {
            if (String(over.id).startsWith('formation-row-')) {
                const memberId = active.id;
                const rowName = String(over.id).replace('formation-row-', '');
                if (releaseType === 'album') {
                    handleAlbumLineupChange(memberId, rowName);
                } else {
                    handleLineupChange(memberId, rowName);
                }
            }
        }
    };

    const DraggableMemberRow = memo(({ member, track, trackIndex }) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: member.id });
        const style = { transform: CSS.Transform.toString(transform), transition };
        const isCenter = String(track?.center) === String(member.id);
        const lineupChangeHandler = releaseType === 'album' ? handleAlbumLineupChange : handleLineupChange;
        const centerHandler = releaseType === 'album' ? setAlbumCenter : setCenter;
        const radioName = releaseType === 'album' ? `center-radio-album-${trackIndex}` : `center-radio-${trackIndex}`;

        return (
            <tr ref={setNodeRef} style={style} {...attributes} className={`${isCenter ? 'bg-yellow-100 dark:bg-yellow-900' : ''}`}>
                <td className="p-2 cursor-grab" style={{ touchAction: 'none', userSelect: 'none' }} {...listeners}>
                    <GripVertical size={18} className="text-gray-400" />
                </td>
                <td className="p-2 font-medium dark:text-gray-200">{member.name}</td>
                <td className="p-2">
                    <select value={track?.lineup[String(member.id)] || '5th Row'} onChange={(e) => lineupChangeHandler(member.id, e.target.value)} className="w-full p-1 border rounded text-xs bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200">
                        <option>1st Row</option><option>2nd Row</option><option>3rd Row</option><option>4th Row</option><option>5th Row</option>
                    </select>
                </td>
                <td className="p-2 text-center">
                            <input 
                                type="checkbox" 
                                name={radioName} 
                                checked={(track?.center || []).includes(String(member.id))} 
                                onChange={() => centerHandler(member.id)} 
                                className="form-checkbox h-4 w-4 text-blue-600" 
                            />
                </td>
            </tr>
        );
    });

const handleReleaseTypeSelect = (type) => {
    setReleaseType(type);
    if (type === 'album') {
        setAlbumTracks([
            { name: 'Lead Track', unitName: 'Senbatsu', type: 'title', members: [], center: [], lineup: {} },
            ...Array.from({ length: 7 }, (_, i) => ({ name: `B-Side ${i + 1}`, unitName: `Unit ${i + 2}`, type: 'b-side', members: [], center: [], lineup: {} }))
        ]);
        setStep('selection');
    } else if (type === 'graduationSingle') {
        setStep('selectGraduatingMember'); // Go to our new step
    } else { // 'single'
        setStep('selection');
    }
};
    // --- Functions for Album Tracks ---
    const updateAlbumTrackName = (index, newName) => setAlbumTracks(prev => prev.map((track, i) => i === index ? { ...track, name: newName } : track));
    const updateAlbumUnitName = (index, newUnitName) => setAlbumTracks(prev => prev.map((track, i) => i === index ? { ...track, unitName: newUnitName } : track));
    const toggleAlbumMember = (memberId) => setAlbumTracks(prev => prev.map((track, index) => {
        if (index !== selectedAlbumTrackIndex) return track;
        const memberIdStr = String(memberId);
        const isMemberSelected = track.members.map(String).includes(memberIdStr);
        let newMembers;
        let newLineup = { ...track.lineup };
        if (isMemberSelected) {
            newMembers = track.members.filter(id => String(id) !== memberIdStr);
            delete newLineup[memberIdStr];
        } else {
            newMembers = [...track.members.map(String), memberIdStr];
            newLineup[memberIdStr] = '5th Row'; // Default row
        }
            let newCenter = (track.center || []).filter(centerId => newMembers.includes(String(centerId)));
            return { ...track, members: newMembers, center: newCenter, lineup: newLineup };
    }));
const setAlbumCenter = (memberId) => {
    setAlbumTracks(prev => prev.map((track, index) => {
        if (index !== selectedAlbumTrackIndex) return track;

        const memberIdStr = String(memberId);
        const currentCenters = track.center || [];
        let newCenters;

        if (currentCenters.includes(memberIdStr)) {
            newCenters = currentCenters.filter(id => id !== memberIdStr);
        } else {
            newCenters = [...currentCenters, memberIdStr];
        }
        return { ...track, center: newCenters };
    }));
};
    const handleAlbumLineupChange = (memberId, row) => setAlbumTracks(prev => prev.map((track, index) => index === selectedAlbumTrackIndex ? { ...track, lineup: { ...track.lineup, [String(memberId)]: row } } : track));
    const toggleMember = (memberId) => setTracks(prev => prev.map((track, index) => { if (index !== selectedTrackIndex) return track; const memberIdStr = String(memberId); const isMemberSelected = track.members.map(String).includes(memberIdStr); let newMembers; let newLineup = { ...track.lineup }; if (isMemberSelected) { newMembers = track.members.filter(id => String(id) !== memberIdStr); delete newLineup[memberIdStr]; } else { newMembers = [...track.members.map(String), memberIdStr]; newLineup[memberIdStr] = '5th Row'; } let newCenter = track.center; if (!newMembers.includes(String(track.center))) newCenter = null; return { ...track, members: newMembers, center: newCenter, lineup: newLineup }; }));
    const setCenter = (memberId) => {
        setTracks(prev => prev.map((track, index) => {
            if (index !== selectedTrackIndex) return track;

            const memberIdStr = String(memberId);
            const currentCenters = track.center || [];
            let newCenters;

            if (currentCenters.includes(memberIdStr)) {
                // If already a center, remove them
                newCenters = currentCenters.filter(id => id !== memberIdStr);
            } else {
                // If not a center, add them
                newCenters = [...currentCenters, memberIdStr];
            }
            return { ...track, center: newCenters };
        }));
    };
    const addTrack = () => { setTracks(prev => [...prev, { name: `B-Side ${prev.length}`, unitName: `Unit ${prev.length}`, type: 'b-side', members: [], center: [], lineup: {}, cdType: 'common' }]); setSelectedTrackIndex(tracks.length); };
    const handleLineupChange = (memberId, row) => setTracks(prev => prev.map((track, index) => index === selectedTrackIndex ? { ...track, lineup: { ...track.lineup, [String(memberId)]: row } } : track));
    const handleRandomizeMembers = (trackIndex, numToSelect) => {
    const currentTrack = releaseType === 'album' ? albumTracks[trackIndex] : tracks[trackIndex];
    if (!currentTrack) return;

    const allMemberIdsInRelease = (releaseType === 'album' ? albumTracks : tracks).flatMap(t => t.members);
    const availablePool = selectableMembers.filter(m => !allMemberIdsInRelease.includes(String(m.id)));
    
    if (availablePool.length === 0) {
        setMessage("No unchosen members available to randomize.");
        return;
    }

    const num = Math.min(numToSelect, availablePool.length);
    const shuffled = [...availablePool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, num).map(m => String(m.id));
    
    const updateFn = (prevTracks) => prevTracks.map((track, index) => {
        if (index !== trackIndex) return track;
        
        const newMembers = [...new Set([...track.members, ...selected])];
        const newLineup = { ...track.lineup };
        selected.forEach(id => {
            if (!newLineup[id]) newLineup[id] = '5th Row';
        });

        return { ...track, members: newMembers, lineup: newLineup };
    });

    if (releaseType === 'album') {
        setAlbumTracks(updateFn);
    } else {
        setTracks(updateFn);
    }
};

// --- Data Derivation and Filtering ---
    const { isCollaboration, rivalPartner } = modalData || {};

    // Generate rival members if this is a collaboration
    let rivalMembers = [];
    if (isCollaboration && rivalPartner) {
        const generateRandomRivalName = () => {
            const first = ['Yuki', 'Airi', 'Miki', 'Mei', 'Rina', 'Saki', 'Haru', 'Mao', 'Rei', 'Yui', 'Asuka', 'Eri', 'Nana', 'Miu', 'Sara', 'Hina', 'Momo', 'Yuna', 'Rika', 'Ayaka'];
            const last = ['Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Yamamoto', 'Nakamura', 'Kobayashi', 'Kato'];
            return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
        };

        const rivalAce = {
            id: `rival-${rivalPartner.id}-ace`,
            rosterId: `rival-${rivalPartner.id}-ace`,
            name: `${rivalPartner.ace.name} (${rivalPartner.name})`,
            age: 20,
            singing: 95, dancing: 92, visual: 98, variety: 75, charisma: 90, intelligence: 80, morale: 100, isAvailable: true,
            fans: { hardcore: Math.floor((rivalPartner.ace.fans || 250000) * 0.4), casual: Math.ceil((rivalPartner.ace.fans || 250000) * 0.6) },
            homeGroup: rivalPartner.name,
            isSisterMember: true,
            displayGroupName: rivalPartner.name,
            isRival: true,
            generation: "Rival Ace"
        };

        const otherRivalMembers = Array.from({ length: 20 }, (_, i) => {
            const id = `rival-${rivalPartner.id}-${i}`;
            const rivalMemberFans = 100000 + Math.floor(Math.random() * 50000); // Generates 100k to 150k fans
            return {
                id: id,
                rosterId: id,
                name: `${generateRandomRivalName()} (${rivalPartner.name})`,
                age: 18 + Math.floor(Math.random() * 4), // 18-21
                singing: 75 + Math.floor(Math.random() * 20), // 75-94
                dancing: 75 + Math.floor(Math.random() * 20), // 75-94
                visual: 75 + Math.floor(Math.random() * 20),  // 75-94
                variety: 60 + Math.floor(Math.random() * 25), // 60-84
                charisma: 70 + Math.floor(Math.random() * 20), // 70-89
                intelligence: 65 + Math.floor(Math.random() * 20), // 65-84
                morale: 100, isAvailable: true,
                fans: { hardcore: Math.floor(rivalMemberFans * 0.2), casual: Math.ceil(rivalMemberFans * 0.8) },
                homeGroup: rivalPartner.name,
                isSisterMember: true, // This is key for the display logic
                displayGroupName: rivalPartner.name, // Also key
                isRival: true,
                generation: "Rival Member"
            };
        });

        rivalMembers = [rivalAce, ...otherRivalMembers];
    }

let selectableMembers = [];
// First, get the single source of truth for all members, which now includes exchange students.
const allAvailableForSong = getAllAvailableMembers(true);

if (targetGroup === 'main') {
    // If the target is the main group, filter for members who are:
    // 1. Not a sister member (i.e., they are a main group member)
    // 2. Are an exchange student
    // 3. Have a concurrent position (Kennin) in the main group
    selectableMembers = allAvailableForSong.filter(m => 
        m.isAvailable && (!m.isSisterMember || m.isExchangeStudent || (m.kenninGroups || []).includes(groupName))
    );
} else {
    // If the target is a sister group
    const sg = sisterGroups.find(s => s.name === targetGroup);
    if (sg) {
        // Filter for members who are:
        // 1. Part of that sister group
        // 2. Have a concurrent position (Kennin) in that sister group
        selectableMembers = allAvailableForSong.filter(m => 
            m.isAvailable && (String(m.groupId) === String(sg.id) || (m.kenninGroups || []).includes(sg.name))
        );
    }
}

    // Add rival members to the selectable pool if it's a collaboration
    if (isCollaboration) {
        selectableMembers.push(...rivalMembers);
    }

    selectableMembers.sort((a, b) => getTotalFansForMember(b) - getTotalFansForMember(a));


    const currentTrack = tracks[selectedTrackIndex];
    const selectableSenbatsu = selectableMembers.filter(m => (currentTrack?.members || []).map(String).includes(String(m.id)));


// --- NEW: Generate structured data for the new filter ---
const mainGroupGenerations = [...new Set(selectableMembers.filter(m => (!m.isSisterMember || m.homeGroup === 'main')).map(m => m.generation).filter(Boolean))];
const sisterGroupDetails = sisterGroups.map(sg => ({
    ...sg,
    generations: [...new Set(selectableMembers.filter(m => m.groupId === sg.id).map(m => m.generation).filter(Boolean))]
}));

// --- NEW: Logic to filter members based on the detailed dropdown selection ---
let filteredMembers = selectableMembers;
if (memberFilter !== 'all') {
    if (memberFilter === 'main') {
        filteredMembers = selectableMembers.filter(m => (!m.isSisterMember || m.homeGroup === 'main'));
    } else if (memberFilter.startsWith('main-gen-')) {
        const gen = memberFilter.replace('main-gen-', '');
        filteredMembers = selectableMembers.filter(m => (!m.isSisterMember || m.homeGroup === 'main') && m.generation === gen);
    } else if (memberFilter.startsWith('sg-')) {
        if (memberFilter.includes('-gen-')) {
            const [sgIdStr, gen] = memberFilter.replace('sg-', '').split('-gen-');
            const sgId = parseInt(sgIdStr, 10);
            filteredMembers = selectableMembers.filter(m => m.groupId === sgId && m.generation === gen);
        } else {
            const sgId = parseInt(memberFilter.replace('sg-', ''), 10);
            filteredMembers = selectableMembers.filter(m => m.groupId === sgId);
        }
    }
}

    // --- UPDATED Function ---
    // Define the list of currently visible members based on the filter
    let visibleRoster = selectableMembers.filter(member => {
        if (filterKey === 'All') return true;
        
        if (filterKey.startsWith('team-')) {
            const teamId = parseInt(filterKey.replace('team-', ''), 10);
            const selectedTeam = teams.find(t => t.id === teamId);
            if (!selectedTeam) return false;
            if (member.teamId !== teamId) return false;
            if (selectedTeam.groupId === 'main') return !member.isSister;
            else return member.isSister;
        }
        if (filterKey === 'main') {
            return !member.isSister;
        }
        if (filterKey.startsWith('main-gen-')) {
            const gen = filterKey.replace('main-gen-', '');
            return !member.isSister && member.generation === gen;
        }
        if (filterKey.startsWith('sg-')) {
            if (filterKey.includes('-gen-')) {
                const [sgIdStr, gen] = filterKey.replace('sg-', '').split('-gen-');
                const sgId = parseInt(sgIdStr, 10);
                return member.groupId === sgId && member.generation === gen;
            } else {
                const sgId = parseInt(filterKey.replace('sg-', ''), 10);
                return member.groupId === sgId;
            }
        }
        return false;
    });

    if (showOnlyUnchosen) {
        const allChosenMemberIds = new Set(tracks.flatMap(t => t.members.map(String)));
        visibleRoster = visibleRoster.filter(member => !allChosenMemberIds.has(String(member.id)));
    }

    const handleToggleSelectAllFiltered = () => {
        if (!currentTrack) return;
        
        // This now correctly uses the 'visibleRoster' variable defined above
        const visibleIds = visibleRoster.map(m => String(m.id));
        const allCurrentlySelected = visibleIds.every(id => currentTrack.members.map(String).includes(id));
        
        setTracks(prev => prev.map((track, index) => {
            if (index !== selectedTrackIndex) return track;
            let newMembers;
            let newLineup = { ...track.lineup };

            if (allCurrentlySelected) {
                // Deselect all visible
                newMembers = track.members.filter(id => !visibleIds.includes(String(id)));
                visibleIds.forEach(id => delete newLineup[id]);
            } else {
                // Select all visible that are not already selected
                const newIdsToAdd = visibleIds.filter(id => !track.members.map(String).includes(id));
                newMembers = [...track.members.map(String), ...newIdsToAdd];
                newIdsToAdd.forEach(id => { if (!newLineup[id]) newLineup[id] = '5th Row'; });
            }

            let newCenter = (track.center || []).filter(centerId => newMembers.includes(String(centerId)));
            return { ...track, members: newMembers, center: newCenter, lineup: newLineup };
        }));
    };

    const getMemberWarningForSingle = (memberId) => {
        const memberIdStr = String(memberId);
        const otherTracks = tracks.filter((track, index) => index !== selectedTrackIndex && track.members.map(String).includes(memberIdStr));
        if (otherTracks.length > 0) {
            return `(In: ${otherTracks.map(t => t.name).join(', ')})`;
        }
        return null;
    };
    
    const getMemberWarningForAlbum = (memberId) => {
        const memberIdStr = String(memberId);
        const otherTracks = albumTracks.filter((track, index) => index !== selectedAlbumTrackIndex && track.members.map(String).includes(memberIdStr));
        if (otherTracks.length > 0) {
            return `(In: ${otherTracks.map((t,i) => `Track ${albumTracks.indexOf(t)+1}`).join(', ')})`;
        }
        return null;
    };

        const getMemberWarning = (member) => {
            if (member.isGraduating) {
                return 'Graduating';
            }
            // In the future, we can add other generic warnings here.
            return null;
        };


    const handleToggleSelectAllFilteredForAlbum = () => {
        const currentTrack = albumTracks[selectedAlbumTrackIndex];
        if (!currentTrack) return;
        
        const visibleRoster = selectableMembers.filter(member => {
            if (filterKey === 'Unchosen') {
                const isMemberInAnyTrack = albumTracks.some(track => track.members.map(String).includes(String(member.id)));
                return !isMemberInAnyTrack;
            }
            if (filterKey === 'All') return true;
            const originalMemberId = String(member.id).includes('sg-') ? String(member.id).split('-')[2] : String(member.id);
            const memberData = getMemberById(originalMemberId, member.isSister ? member.groupId : 'main');
            const memberTeamName = memberData?.teamName;
            if (filterKey === 'main' || filterKey === groupName) return !member.isSister;
            if (member.homeGroup === filterKey) return true;
            if (memberTeamName && memberTeamName === filterKey) return true;
            return false;
        });

        const visibleIds = visibleRoster.map(m => String(m.id));
        const allCurrentlySelected = visibleIds.every(id => currentTrack.members.map(String).includes(id));
        
        setAlbumTracks(prev => prev.map((track, index) => {
            if (index !== selectedAlbumTrackIndex) return track;
            let newMembers;
            let newLineup = { ...track.lineup };
            if (allCurrentlySelected) {
                newMembers = track.members.filter(id => !visibleIds.includes(String(id)));
                visibleIds.forEach(id => delete newLineup[id]);
            } else {
                const newIdsToAdd = visibleIds.filter(id => !track.members.map(String).includes(id));
                newMembers = [...track.members, ...newIdsToAdd];
                newIdsToAdd.forEach(id => { if (!newLineup[id]) newLineup[id] = '5th Row'; });
            }
            let newCenter = track.center;
            if (!newMembers.map(String).includes(String(track.center))) newCenter = null;
            return { ...track, members: newMembers, center: newCenter, lineup: newLineup };
        }));
    };


const handleSchedule = () => {
    if (money < totalProductionCost) return setMessage("Not enough money for this production!");
    
    const songData = {
        name: songName.trim(),
        targetGroup: targetGroup,
        releaseFormat: releaseFormat,
        tracks: tracks.map(t => {
            const trackMembers = (t.members || []).map(String).map(id => getMemberById(id) || rivalMembers.find(r => r.id === id)).filter(Boolean);
            return {
                name: t.name,
                unitName: t.unitName,
                type: t.type,
                popularity: 1.0,
                        members: trackMembers.map(member => ({
                            ...member,
                            id: member.rosterId || member.id,
                            name: member.name,
                            teamName: member.teamName,
                            displayGroupName: member.isSisterMember ? member.displayGroupName : groupName,
                            isSisterMember: member.isSisterMember,
                            generation: member.generation,
                            isKenkyuusei: !member.teamName,
                            isKennin: member.isKennin || (member.kenninGroups && member.kenninGroups.length > 0),
                            kenninGroups: member.kenninGroups || [],
                            homeGroup: member.homeGroup || (member.isSisterMember ? member.displayGroupName : groupName)
                        })),
                center: t.center,
                lineup: t.lineup,
                cdType: t.cdType
            };
        }),
        isGraduationSingle: releaseType === 'graduationSingle', // This is the new line
        isElectionSingle: isElectionSingle, 
        isCollaboration: isCollaboration, // Add this line
        rivalPartner: rivalPartner,     // Add this line        
};
            
    scheduleNewSingle({ 
        songData, 
        productionData: productionChoices, 
        releaseWeek,
        physicalVersions,
        includeHandshakeTickets 
    });
};

    const handleConfirmAlbum = () => {
        if (money < totalProductionCost) return setMessage("Not enough money for this album!");
        
        // If targetGroup is 'main', use the main group's name. Otherwise, use targetGroup (which will be the sister group's name).
        const artistName = targetGroup === 'main' ? groupName : targetGroup;

        const albumDataObject = {
            name: albumName.trim(),
            artist: artistName,
            releaseFormat: releaseFormat,
            tracks: albumTracks.map(t => {
                const trackMembers = (t.members || []).map(String).map(id => getMemberById(id)).filter(Boolean);
                return {
                    name: t.name,
                    unitName: t.unitName,
                    type: t.type,
                    popularity: 1.0,
                        members: trackMembers.map(member => ({
                            id: member.rosterId || member.id,
                            name: member.name,
                            teamName: member.teamName,
                            displayGroupName: member.isSisterMember ? member.displayGroupName : groupName,
                            isSisterMember: member.isSisterMember,
                            generation: member.generation,
                            isKenkyuusei: !member.teamName,
                            isKennin: member.isKennin || (member.kenninGroups && member.kenninGroups.length > 0),
                            kenninGroups: member.kenninGroups || [],
                            homeGroup: member.homeGroup || (member.isSisterMember ? member.displayGroupName : groupName)
                        })),
                    center: t.center,
                    lineup: t.lineup
                };
            }),
        };

        scheduleNewAlbum({ albumData: albumDataObject, productionData: productionChoices, releaseWeek });
    };


    const PyramidVisualization = ({ lineup, members, center, activeDragId }) => {
        const DraggableChip = memo(({ member }) => {
            const { attributes, listeners, setNodeRef } = useDraggable({ id: member.id });
            return (
                <div ref={setNodeRef} {...listeners} {...attributes} style={{ touchAction: 'none' }} className={`p-1 rounded text-center cursor-grab transition-all duration-200 ${(center || []).includes(String(member.id)) ? 'bg-yellow-400 text-black ring-2 ring-yellow-200' : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100'}`}>
                    <div className="flex flex-col items-center leading-tight" style={{ userSelect: 'none' }}>
                        <span className="font-semibold text-[11px]">{member.nickname || member.name.split(' ')[0]}</span>
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">Vo:{Math.round(member.singing)} Da:{Math.round(member.dancing)} Vi.{Math.round(member.visual)}</span>
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">Fans: {getTotalFansForMember(member).toLocaleString()}</span>
                    </div>
                </div>
            );
        });

        const DroppableRow = ({ rowName, children }) => {
            const { setNodeRef, isOver } = useDroppable({ id: `formation-row-${rowName}` });
            const style = { transition: 'background-color 0.2s ease-in-out', backgroundColor: isOver ? 'rgba(34, 197, 94, 0.2)' : undefined, border: isOver ? '2px dashed #22C55E' : '2px dashed transparent', padding: '8px', borderRadius: '8px', minHeight: '40px' };
            return <div ref={setNodeRef} style={style}>{children}</div>;
        };

        const rows = { '1st Row': [], '2nd Row': [], '3rd Row': [], '4th Row': [], '5th Row': [] };
        members.forEach(member => { const row = lineup[String(member.id)]; if (rows[row]) rows[row].push(member); });
        Object.keys(rows).forEach(row => rows[row].sort((a, b) => (b.fans || 0) - (a.fans || 0)));

        return (
            <div className="p-4 border border-gray-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg flex flex-col items-center gap-4">
                <h4 className="font-bold text-lg tracking-wider">FORMATION</h4>
                {['1st Row', '2nd Row', '3rd Row', '4th Row', '5th Row'].map(rowName => (
                    <div key={rowName} className="flex flex-col items-center w-full">
                        <DroppableRow rowName={rowName}>
                            <div className="flex justify-center flex-wrap gap-2">
                                {rows[rowName].length > 0 ? (rows[rowName].map(member => (<DraggableChip key={member.rosterId} member={member} />))) : (<p className="text-xs text-gray-400">Drop members here</p>)}
                            </div>
                        </DroppableRow>
                        <p className="text-xs text-gray-500 mt-1">{rowName} ({rows[rowName].length})</p>
                    </div>
                ))}
            </div>
        );
    };

    const renderTypeSelectionStep = () => (
    <div className="text-center p-8" style={{minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <h3 className="text-3xl font-bold mb-6 dark:text-gray-100">What do you want to produce?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            <button
                onClick={() => handleReleaseTypeSelect('single')}
                className="p-8 bg-blue-500 text-white rounded-xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 transition-all duration-300 transform hover:-translate-y-1"
            >
                <Music size={32} className="mx-auto mb-3" />
                <span className="font-bold text-xl">New Single</span>
                <p className="text-sm text-blue-100 mt-1">A standard release with a title track and B-sides.</p>
            </button>
            <button
                onClick={() => handleReleaseTypeSelect('graduationSingle')}
                className="p-8 bg-yellow-500 text-white rounded-xl shadow-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-800 transition-all duration-300 transform hover:-translate-y-1"
            >
                <Star size={32} className="mx-auto mb-3" />
                <span className="font-bold text-xl">Graduation Single</span>
                <p className="text-sm text-yellow-100 mt-1">A special single centered on a graduating member.</p>
            </button>
            <button
                onClick={() => handleReleaseTypeSelect('album')}
                className="p-8 bg-purple-500 text-white rounded-xl shadow-lg hover:bg-purple-600 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 transition-all duration-300 transform hover:-translate-y-1"
            >
                <Layers size={32} className="mx-auto mb-3" />
                <span className="font-bold text-xl">Original Album</span>
                <p className="text-sm text-purple-100 mt-1">A full-length album with all-new songs.</p>
            </button>
        </div>
    </div>
);

const handleGraduatingMemberConfirm = (member) => {
    const gradSongName = generateSongTitle('Graduation');
    setSongName(gradSongName);

    // Pre-configure the tracks for a graduation single
    setTracks([
        { name: gradSongName, unitName: 'Senbatsu', type: 'title', members: [String(member.id)], center: [String(member.id)], lineup: { [String(member.id)]: '1st Row' } },
        { name: 'Common B-Side', unitName: 'Universe Girls', type: 'b-side', members: [], center: null, lineup: {}, cdType: 'common' }
    ]);

    // Move to the standard selection step
    setStep('selection');
};

const renderSelectGraduatingMemberStep = () => {
    // We can show all members, or filter for members who are older, etc.
    // For now, let's show all available members.
    const potentialGraduates = selectableMembers.filter(m => m.isGraduating).sort((a,b) => b.yearsActive - a.yearsActive);

    return (
        <div className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">Select the Graduating Member</h3>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-6">Choose the member who will be the center of this graduation single.</p>
            <div className="max-h-[60vh] overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {potentialGraduates.map(member => (
                    <div key={member.rosterId} onClick={() => handleGraduatingMemberConfirm(member)} className="p-4 border rounded-lg text-center cursor-pointer hover:bg-yellow-100 dark:hover:bg-gray-700 dark:border-gray-600">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
                        <p className="font-bold dark:text-gray-200">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Fans: {getTotalFansForMember(member).toLocaleString()}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Years Active: {member.yearsActive}</p>
                    </div>
                ))}
            </div>
             <div className="flex justify-start mt-6 pt-4 border-t dark:border-gray-700">
                <button onClick={() => setStep('type')} className="p-2 bg-gray-400 text-white rounded px-4 font-bold hover:bg-gray-500">
                    Back
                </button>
            </div>
        </div>
    )
};

        const renderSelectionStep = () => (
            <>
                <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* --- Left Column: Single/Track setup --- */}
                    <div className="lg:col-span-3 space-y-4">
    {isCollaboration && rivalPartner && (
        <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-pink-300 to-purple-300 dark:from-pink-500/50 dark:to-purple-500/50 border border-pink-400/50 shadow-inner">
            <p className="text-center font-bold text-lg text-white dark:text-gray-100 drop-shadow-md">
                <Sparkles className="inline-block mr-2 text-yellow-300" />
                Collaboration with {rivalPartner.name}!
                <Sparkles className="inline-block ml-2 text-yellow-300" />
            </p>
        </div>
    )}
                        <div>
                            <h4 className="font-semibold mb-1 dark:text-gray-200">Target Group</h4>
                            <select value={targetGroup} onChange={(e) => { setTargetGroup(e.target.value); setTracks([{ name: 'Title Track', unitName: 'Senbatsu', type: 'title', members: [], center: null, lineup: {} }, { name: 'B-Side 1', unitName: 'Universe Girls', type: 'b-side', members: [], center: null, lineup: {}, cdType: 'common' }]); }} className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                <option key="main" value="main">{groupName} (Main)</option>
                                {(sisterGroups || []).map(sg => <option key={sg.id} value={sg.name}>{sg.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1 dark:text-gray-200">Single Name</h4>

                        <div className="flex items-center gap-2 w-full max-w-xs">
                            <input
                                type="text"
                                value={songName}
                                onChange={(e) => setSongName(e.target.value)}
                                className="w-full p-1.5 text-base rounded-md dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Single Name"
                            />
                                <button onClick={() => { const newName = generateUniqueRandomName(); setSongName(newName); updateTrackName(0, newName); }} className="p-1.5 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors" title="Generate Random Name">
                                <Shuffle size={16} />
                            </button>
                        </div>

                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Tracks ({tracks.length})</h4>
                            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto pr-2">
                                {tracks.map((track, index) => (
                                    <div key={index} className={`p-3 border rounded-lg cursor-pointer ${selectedTrackIndex === index ? 'bg-blue-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'}`} onClick={() => setSelectedTrackIndex(index)}>
                                        <div className='flex justify-between items-center mb-1'>
                                            <span className={`font-bold text-sm ${selectedTrackIndex === index ? 'text-white' : 'dark:text-gray-200'}`}>{track.type === 'title' ? 'Title' : `B-Side ${index}`}</span>
                                            <div className="flex items-center gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); updateTrackName(index, generateSongTitle()); }} className="p-1 rounded-md bg-pink-300 text-white hover:bg-pink-400 transition-colors" title="Generate Random Name">
                                                    <Shuffle size={14} />
                                                </button>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${track.type === 'title' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>{track.type.toUpperCase()}</span>
                                            </div>
                                        </div>

                                    <div className="flex gap-2 mt-1">
                                        <input type="text" value={track.name} onChange={(e) => updateTrackName(index, e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-1/2 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${selectedTrackIndex === index ? 'bg-blue-400 dark:bg-blue-600 text-white placeholder-gray-200 border-blue-500' : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'}`} placeholder="Track Name"/>
                                        <input type="text" value={track.unitName} onChange={(e) => updateUnitName(index, e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-1/2 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 ${selectedTrackIndex === index ? 'bg-blue-400 dark:bg-blue-600 text-white placeholder-gray-200 border-blue-500' : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'}`} placeholder="Unit Name"/>
                                    </div>

                        {/* --- NEW: Physical CD Type Selector --- */}
                        {releaseFormat === 'physical' && track.type === 'b-side' && (
                            <div className="mt-2">
                                <label className={`text-xs font-semibold ${selectedTrackIndex === index ? 'text-white' : 'dark:text-gray-300'}`}>CD Type</label>
                                <select
                                    value={track.cdType || 'common'}
                                    onChange={(e) => { e.stopPropagation(); updateTrackCDType(index, e.target.value); }}
                                    onClick={(e) => e.stopPropagation()}
                                    className={`w-full p-1 border rounded text-xs mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 ${selectedTrackIndex === index ? 'bg-blue-400 dark:bg-blue-600 text-white placeholder-gray-200 border-blue-500' : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'}`}
                                >
                                    <option value="common">Common (All versions)</option>
                                    <option value="A">Type A Exclusive</option>
                                    <option value="B">Type B Exclusive</option>
                                    <option value="C">Type C Exclusive</option>
                                    <option value="D">Type D Exclusive</option>
                                </select>
                            </div>
                        )}


                                    </div>
                                ))}
                            </div>
                            <button onClick={addTrack} className="w-full mt-2 p-2 bg-gray-200 text-gray-700 rounded text-sm flex items-center justify-center font-semibold hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                                <Plus size={16} className="mr-1"/> Add B-Side
                            </button>
                        </div>
                    </div>

                    {/* --- Center Column: Selection & Lineup (UPDATED)--- */}
                    <div className="lg:col-span-5 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">1. Senbatsu Selection for: <span className="text-blue-600 dark:text-blue-400 font-bold">{currentTrack?.name || 'Track'}</span></h4>
                            <div className="mb-3">
                                <label htmlFor="import-lineup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Import Lineup From...</label>
                                <select
                                    id="import-lineup"
                                    onChange={(e) => applyPreviousLineup(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
                                >
                                    <option value="">-- Select a past track --</option>
                                        {historicalTracks.map(track => (
                                            <option key={track.id} value={track.id}>
                                                {track.name}
                                            </option>
                                        ))}
                                        {lastElectionResult && (
                                            <optgroup label="Last General Election">
                                                <option value="election-senbatsu">Senbatsu (Ranks 1-16)</option>
                                                <option value="election-undergirls">Undergirls (Ranks 17-32)</option>
                                                <option value="election-nextgirls">Next Girls (Ranks 33-48)</option>
                                                <option value="election-futuregirls">Future Girls (Ranks 49-64)</option>
                                                <option value="election-upcominggirls">Upcoming Girls (Ranks 65-80)</option>
                                            </optgroup>
                                            
                                        )}

                                        {lastJankenResult && (
                                            <optgroup label="Last Janken Tournament">
                                                <option value="janken-senbatsu">Janken Senbatsu (Top 16)</option>
                                            </optgroup>
                                        )}

                                </select>
                            </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <input type="number" id={`random-members-input-${selectedTrackIndex}`} defaultValue="7" className="w-20 p-1 border rounded text-sm bg-white dark:bg-gray-700" />
                                    <button onClick={() => {
                                        const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                        if (input) handleRandomizeMembers(selectedTrackIndex, parseInt(input.value, 10));
                                    }} className="px-2 py-1 text-xs bg-purple-500 text-white rounded">Random Members</button>
                                        <button onClick={() => {
                                            const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                            if (input) handleRandomizeByFans(selectedTrackIndex, parseInt(input.value, 10));
                                        }} className="px-2 py-1 text-xs bg-teal-500 text-white rounded">Select by Fans</button>
                                <button onClick={() => {
                                        const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                        if (input) handleSelectByAvgSkill(selectedTrackIndex, parseInt(input.value, 10));
                                    }} className="px-2 py-1 text-xs bg-sky-500 text-white rounded">Select by Skill</button>
                                
                                </div>
                            <div className="mb-2">
                                <label htmlFor="member-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter Members</label>
                                <select 
                                    id="member-filter" 
                                    value={filterKey} 
                                    onChange={e => setFilterKey(e.target.value)} 
                                    className="w-full p-2 text-sm rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                >
                                    <option value="All">All</option>
                                    
                                    {(teams || []).length > 0 && (
                                        <optgroup label="Teams">
                                            {teams.map(team => (
                                                <option key={`team-${team.id}`} value={`team-${team.id}`}>{team.name}</option>
                                            ))}
                                        </optgroup>
                                    )}
                                    
                                    <optgroup label="Groups">
                                        <option key="main" value="main">{groupName}</option>
                                        {sisterGroups.map(sg => (
                                            <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>
                                        ))}
                                    </optgroup>

                                    {mainGroupGenerations.length > 0 && (
                                        <optgroup label={`${groupName} Generations`}>
                                            {mainGroupGenerations.map(gen => (
                                                <option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>
                                            ))}\
                                        </optgroup>
                                    )}

                                    {sisterGroupDetails.map(sg => (
                                        sg.generations.length > 0 && (
                                            <optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Generations`}>
                                                {sg.generations.map(gen => (
                                                    <option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>
                                                ))}
                                            </optgroup>
                                        )
                                    ))}
                                </select>
                                <div className="mt-2">
                                    <label className="flex items-center text-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showOnlyUnchosen}
                                            onChange={(e) => setShowOnlyUnchosen(e.target.checked)}
                                            className="form-checkbox h-4 w-4 rounded text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <span className="ml-2 text-gray-700 dark:text-gray-300">Show only unchosen members</span>
                                    </label>
                                </div>
                            </div>

                            <button onClick={handleToggleSelectAllFiltered} className="w-full mb-2 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">Toggle Select All (Filtered)</button>
                                                        
                            <div className="border rounded p-2 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-sm">
                                {visibleRoster.map(member => {
                                    const isSelected = currentTrack?.members.map(String).includes(String(member.id));
                                    return (
                                        <div key={member.rosterId} className="flex items-center justify-between p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                            <div className="flex flex-col">
                                                <span className="font-medium dark:text-gray-200">
                                                    {member.name}
                                                    <span className="ml-2 text-xs text-pink-300 font-normal">
                                                        {(() => {
                                                            const otherTracks = tracks.filter(t => 
                                                                t.name !== (currentTrack?.name || '') && 
                                                                (t.members || []).map(String).includes(String(member.id))
                                                            );
                                                            if (otherTracks.length > 0) {
                                                                return `(in ${otherTracks.map(t => t.name).join(', ')})`;
                                                            }
                                                            return null;
                                                        })()}
                                                    </span>
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Vocal:{Math.round(member.singing)} Dance:{Math.round(member.dancing)} Visual:{Math.round(member.visual)} Fans:{getTotalFansForMember(member).toLocaleString()}
                                                    {getMemberWarning(member) && <span className="text-yellow-500 ml-2 font-semibold">{getMemberWarning(member)}</span>}
                                                </span>
                                            </div>
                                            <button onClick={() => toggleMember(member.id)} className={`px-2 py-1 text-xs rounded ${isSelected ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {isSelected ? 'Remove' : 'Add'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold dark:text-gray-200">2. Line-up & Center Assignment</h4>
                            <div className="flex gap-1">
                                <button onClick={handleRandomizeRows} className="px-2 py-1 text-xs bg-teal-500 text-white rounded">Randomize Rows</button>
                                <button onClick={() => handleRankRowsByFans(selectedAlbumTrackIndex)} className="px-2 py-1 text-xs bg-cyan-500 text-white rounded">Rank Rows by Fans</button>
                                <button onClick={() => handleRankRowsByAvgSkill(selectedAlbumTrackIndex)} className="px-2 py-1 text-xs bg-sky-500 text-white rounded">Rank Rows by Skill</button>
                            </div>
                        </div>
                            <div className="max-h-96 overflow-y-auto border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900">
                                        <tr className="text-left"><th className="p-2 w-8"></th><th className="p-2 font-bold dark:text-gray-200">Member</th><th className="p-2 font-bold dark:text-gray-200">Row</th><th className="p-2 text-center font-bold dark:text-gray-200">Center</th></tr>
                                    </thead>
                                        <SortableContext items={selectableSenbatsu.map(m => m.id)} strategy={verticalListSortingStrategy}>
                                            <tbody>
                                                {selectableSenbatsu.map(member => (
                                                    <DraggableMemberRow
                                                        key={member.rosterId}
                                                        member={member}
                                                        track={currentTrack}
                                                        trackIndex={selectedTrackIndex}
                                                    />
                                                ))}
                                            </tbody>
                                        </SortableContext>
                                </table>
                                {selectableSenbatsu.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 p-4">Select members to assign positions.</p>}
                            </div>
                        </div>
                    </div>
                    {/* --- Right Column: Visualizer --- */}
                    <div className="lg:col-span-4">
                         <h4 className="font-semibold mb-2 text-center lg:text-left dark:text-gray-200">3. Formation Visualizer</h4>
                            <PyramidVisualization lineup={currentTrack?.lineup || {}} members={selectableSenbatsu} center={currentTrack?.center} activeDragId={activeDragId} />
                        </div>
                    </div>
                    <DragOverlay>{draggingMember ? <DragOverlayChip member={draggingMember} /> : null}</DragOverlay>
                    </DndContext>
                    <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-700">
                    <button onClick={() => setStep('type')} className="p-2 bg-gray-400 text-white rounded px-4 font-bold hover:bg-gray-500">
                        Back
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => setShowModal(null)} className="p-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded px-4">Cancel</button>
                        <button onClick={() => setStep('production')} disabled={!songName.trim() || tracks.some(t => t.members.length === 0)} className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400 px-4 font-bold">
                            Next: Production
                        </button>
                    </div>
                </div>
            </>
        );

        const renderAlbumSelectionStep = () => {
            const currentTrack = albumTracks[selectedAlbumTrackIndex];
            const selectableSenbatsu = selectableMembers.filter(m => (currentTrack?.members || []).map(String).includes(String(m.id)));

            return (
            <>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* --- Left Column: Album/Track setup --- */}
                    <div className="lg:col-span-3 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-1 dark:text-gray-200">Target Group</h4>
                            <select value={targetGroup} onChange={(e) => setTargetGroup(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                                {allGroups.map(g => <option key={g.id} value={g.name}>{g.name} ({g.isSister ? 'Sister' : 'Main'})</option>)}
                            </select>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-1 dark:text-gray-200">Album Name</h4>
                            <div className="flex items-center gap-2 w-full max-w-xs">
                                <input type="text" value={albumName} onChange={(e) => setAlbumName(e.target.value)} className="w-full p-1.5 text-base rounded-md dark:bg-gray-800 dark:text-gray-200 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Album Name"/>
                                <button onClick={() => { const newName = generateUniqueRandomName(); setAlbumName(newName); updateAlbumTrackName(0, newName); }} className="p-1.5 bg-pink-300 text-white rounded-lg hover:bg-pink-400 transition-colors" title="Generate Random Name">
                                    <Shuffle size={16} />
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">Tracks ({albumTracks.length})</h4>
                            <div className="flex flex-col gap-2 max-h-96 overflow-y-auto pr-2">
                                {albumTracks.map((track, index) => (
                                    <div key={index} className={`p-3 border rounded-lg cursor-pointer ${selectedAlbumTrackIndex === index ? 'bg-purple-500 text-white shadow-lg' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-700'}`} onClick={() => setSelectedAlbumTrackIndex(index)}>
                                        <div className='flex justify-between items-center mb-1'>
                                            <span className={`font-bold text-sm ${selectedAlbumTrackIndex === index ? 'text-white' : 'dark:text-gray-200'}`}>{track.type === 'title' ? 'Lead Track' : `B-Side ${index}`}</span>
                                            <div className="flex items-center gap-2">
                                                <button onClick={(e) => { e.stopPropagation(); updateAlbumTrackName(index, generateSongTitle()); }} className="p-1 rounded-md bg-pink-300 text-white hover:bg-pink-400 transition-colors" title="Generate Random Name">
                                                    <Shuffle size={14} />
                                                </button>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${track.type === 'title' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>{track.type === 'title' ? 'LEAD' : 'B-SIDE'}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 mt-1">
                                            <input type="text" value={track.name} onChange={(e) => updateAlbumTrackName(index, e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-1/2 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 ${selectedAlbumTrackIndex === index ? 'bg-purple-400 dark:bg-purple-600 text-white placeholder-gray-200 border-purple-500' : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'}`} placeholder="Track Name"/>
                                            <input type="text" value={track.unitName} onChange={(e) => updateAlbumUnitName(index, e.target.value)} onClick={(e) => e.stopPropagation()} className={`w-1/2 p-1 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 ${selectedAlbumTrackIndex === index ? 'bg-purple-400 dark:bg-purple-600 text-white placeholder-gray-200 border-purple-500' : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200'}`} placeholder="Unit Name"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- Center Column: Selection & Lineup --- */}
                    <div className="lg:col-span-5 space-y-4">
                        <div>
                            <h4 className="font-semibold mb-2 dark:text-gray-200">1. Member Selection for: <span className="text-purple-600 dark:text-purple-400 font-bold">{currentTrack?.name || 'Track'}</span></h4>
                                <div className="mb-3">
                                    <label htmlFor="import-lineup-album" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Import Lineup From...</label>
                                    <select
                                        id="import-lineup-album"
                                        onChange={(e) => applyPreviousLineup(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600"
                                    >
                                        <option value="">-- Select a past track --</option>
                                            {historicalTracks.map(track => (
                                                <option key={track.id} value={track.id}>
                                                    {track.name}
                                                </option>
                                            ))}
                                        {lastElectionResult && (
                                            <optgroup label="Last General Election">
                                                <option value="election-senbatsu">Senbatsu (Ranks 1-16)</option>
                                                <option value="election-undergirls">Undergirls (Ranks 17-32)</option>
                                                <option value="election-nextgirls">Next Girls (Ranks 33-48)</option>
                                                <option value="election-futuregirls">Future Girls (Ranks 49-64)</option>
                                                <option value="election-upcominggirls">Upcoming Girls (Ranks 65-80)</option>
                                            </optgroup>
                                            
                                        )}

                                        {lastJankenResult && (
                                            <optgroup label="Last Janken Tournament">
                                                <option value="janken-senbatsu">Janken Senbatsu (Top 16)</option>
                                            </optgroup>
                                        )}

                                </select>
                            </div>

                                <div className="flex items-center gap-2 mb-2">
                                    <input type="number" id={`random-members-input-${selectedTrackIndex}`} defaultValue="7" className="w-20 p-1 border rounded text-sm bg-white dark:bg-gray-700" />
                                    <button onClick={() => {
                                        const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                        if (input) handleRandomizeMembers(selectedTrackIndex, parseInt(input.value, 10));
                                    }} className="px-2 py-1 text-xs bg-purple-500 text-white rounded">Random Members</button>
                                        <button onClick={() => {
                                            const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                            if (input) handleRandomizeByFans(selectedTrackIndex, parseInt(input.value, 10));
                                        }} className="px-2 py-1 text-xs bg-teal-500 text-white rounded">Select by Fans</button>
                                <button onClick={() => {
                                        const input = document.getElementById(`random-members-input-${selectedTrackIndex}`);
                                        if (input) handleSelectByAvgSkill(selectedTrackIndex, parseInt(input.value, 10));
                                    }} className="px-2 py-1 text-xs bg-sky-500 text-white rounded">Select by Skill</button>
                                
                                </div>
                                
                            <div className="mb-2">
                                <label htmlFor="member-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter Members</label>
                                <select 
                                    id="member-filter" 
                                    value={filterKey} 
                                    onChange={e => setFilterKey(e.target.value)} 
                                    className="w-full p-2 text-sm rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                                >
                                    <option value="All">All</option>
                                    <option value="Unchosen">Unchosen</option>
                                    
                                    {(teams || []).length > 0 && (
                                        <optgroup label="Teams">
                                            {teams.map(team => (
                                                <option key={`team-${team.id}`} value={`team-${team.id}`}>{team.name}</option>
                                            ))}
                                        </optgroup>
                                    )}
                                    
                                    <optgroup label="Groups">
                                        <option value="main">{groupName}</option>
                                        {sisterGroups.map(sg => (
                                            <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>
                                        ))}
                                    </optgroup>

                                    {mainGroupGenerations.length > 0 && (
                                        <optgroup label={`${groupName} Generations`}>
                                            {mainGroupGenerations.map(gen => (
                                                <option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>
                                            ))}
                                        </optgroup>
                                    )}

                                    {sisterGroupDetails.map(sg => (
                                        sg.generations.length > 0 && (
                                            <optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Generations`}>
                                                {sg.generations.map(gen => (
                                                    <option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>
                                                ))}
                                            </optgroup>
                                        )
                                    ))}
                                </select>
                            </div>

                            <button onClick={handleToggleSelectAllFiltered} className="w-full mb-2 px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600">Toggle Select All (Filtered)</button>
                                                        
                            <div className="border rounded p-2 h-96 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-sm">
        {selectableMembers
                    .filter(member => {
                        if (filterKey === 'All') return true;

                        if (filterKey === 'Unchosen') {
                            const isMemberInAnyTrack = tracks.some(track => track.members.map(String).includes(String(member.id)));
                            return !isMemberInAnyTrack;
                        }

                        if (filterKey.startsWith('team-')) {
                            const teamId = parseInt(filterKey.replace('team-', ''), 10);
                            const selectedTeam = teams.find(t => t.id === teamId);

                            if (!selectedTeam) return false;

                            // Member must have the correct teamId to be considered.
                            if (member.teamId !== teamId) {
                                return false;
                            }

                            // CORRECTED LOGIC:
                            // If the selected team is a main group team, only show main group members.
                            if (selectedTeam.groupId === 'main') {
                                return !member.isSister;
                            } 
                            // Otherwise, it's a sister group team, so only show sister group members.
                            else {
                                return member.isSister;
                            }
                        }

                        if (filterKey === 'main') {
                            return !member.isSister;
                        }

                        if (filterKey.startsWith('main-gen-')) {
                            const gen = filterKey.replace('main-gen-', '');
                            return !member.isSister && member.generation === gen;
                        }

                        if (filterKey.startsWith('sg-')) {
                            if (filterKey.includes('-gen-')) {
                                const [sgIdStr, gen] = filterKey.replace('sg-', '').split('-gen-');
                                const sgId = parseInt(sgIdStr, 10);
                                return member.groupId === sgId && member.generation === gen;
                            } else {
                                const sgId = parseInt(filterKey.replace('sg-', ''), 10);
                                return member.groupId === sgId;
                            }
                        }
                        
                        return false;
                    })
            .map(member => {
                                    const isSelected = currentTrack?.members.map(String).includes(String(member.id));
                                    return (
                                        <div key={member.rosterId} className="flex items-center justify-between p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                            <div className="flex flex-col">
                                                <span className="font-medium dark:text-gray-200">
                                                    {member.name}
                                                    <span className="ml-2 text-xs text-pink-300 font-normal">
                                                        {(() => {
                                                            const otherTracks = tracks.filter(t => 
                                                                t.name !== (currentTrack?.name || '') && 
                                                                (t.members || []).map(String).includes(String(member.id))
                                                            );
                                                            if (otherTracks.length > 0) {
                                                                return `(in ${otherTracks.map(t => t.name).join(', ')})`;
                                                            }
                                                            return null;
                                                        })()}
                                                    </span>
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    Vocal:{Math.round(member.singing)} Dance:{Math.round(member.dancing)} Visual:{Math.round(member.visual)} Fans:{getTotalFansForMember(member).toLocaleString()}
                                                    {getMemberWarning(member) && <span className="text-yellow-500 ml-2 font-semibold">{getMemberWarning(member)}</span>}
                                                </span>
                                            </div>
                                            <button onClick={() => toggleMember(member.id)} className={`px-2 py-1 text-xs rounded ${isSelected ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                                {isSelected ? 'Remove' : 'Add'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold dark:text-gray-200">2. Line-up & Center Assignment</h4>
                            <div className="flex gap-1">
                                <button onClick={handleRandomizeRows} className="px-2 py-1 text-xs bg-teal-500 text-white rounded">Randomize Rows</button>
                                <button onClick={handleRankRowsByFans} className="px-2 py-1 text-xs bg-cyan-500 text-white rounded">Rank Rows by Fans</button>
                            </div>
                        </div>
                            <div className="max-h-96 overflow-y-auto border p-2 rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-gray-100 dark:bg-gray-900">
                                        <tr className="text-left"><th className="p-2 w-8"></th><th className="p-2 font-bold dark:text-gray-200">Member</th><th className="p-2 font-bold dark:text-gray-200">Row</th><th className="p-2 text-center font-bold dark:text-gray-200">Center</th></tr>

                                    </thead>
                                        <SortableContext items={selectableSenbatsu.map(m => m.id)} strategy={verticalListSortingStrategy}>
                                            <tbody>
                                                {selectableSenbatsu.map(member => (
                                                    <DraggableMemberRow
                                                        key={member.rosterId}
                                                        member={member}
                                                        track={currentTrack}
                                                        trackIndex={selectedTrackIndex}
                                                    />
                                                ))}
                                            </tbody>
                                        </SortableContext>
                                </table>
                                {selectableSenbatsu.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 p-4">Select members to assign positions.</p>}
                            </div>
                        </div>
                    </div>
                    {/* --- Right Column: Visualizer --- */}
                    <div className="lg:col-span-4">
                         <h4 className="font-semibold mb-2 text-center lg:text-left dark:text-gray-200">3. Formation Visualizer</h4>
                         <PyramidVisualization lineup={currentTrack?.lineup || {}} members={selectableSenbatsu} center={currentTrack?.center} activeDragId={activeDragId} />
                </div>
            </div>
                <DragOverlay>{draggingMember ? <DragOverlayChip member={draggingMember} /> : null}</DragOverlay>
                <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-700">
                    <button onClick={() => setStep('type')} className="p-2 bg-gray-400 text-white rounded px-4 font-bold hover:bg-gray-500">
                        Back
                    </button>
                    <div className="flex gap-2">
                        <button onClick={() => setShowModal(null)} className="p-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 rounded px-4">Cancel</button>
                        <button onClick={() => setStep('production')} disabled={!albumName.trim() || albumTracks.some(t => t.members.length === 0)} className="p-2 bg-purple-500 text-white rounded disabled:bg-gray-400 px-4 font-bold">
                            Next: Production
                        </button>
                    </div>
                </div>
            </>
        );
    };

        const renderProductionStep = () => (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(productionTiers).map(category => (
                        <div key={category} className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <h4 className="font-bold text-md capitalize mb-3 border-b pb-2 dark:text-gray-200 dark:border-gray-700">{category}</h4>
                            <div className="space-y-2">
                                {Object.keys(productionTiers[category]).map(tier => (
                                    <label key={tier} className="flex items-start p-2 rounded-lg border bg-white dark:bg-gray-700 dark:border-gray-600 has-[:checked]:bg-blue-100 has-[:checked]:border-blue-400 dark:has-[:checked]:bg-gray-900 dark:has-[:checked]:border-blue-500 cursor-pointer text-xs">
                                        <input type="radio" name={category} value={tier} checked={productionChoices[category] === tier} onChange={() => handleProductionChange(category, tier)} className="form-radio h-4 w-4 text-blue-600 mt-0.5 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                        <div className="ml-2">
                                            <p className="font-semibold dark:text-gray-200">{productionTiers[category][tier].name}</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs">{productionTiers[category][tier].effect}</p>
                                            <p className="font-bold text-blue-700 dark:text-blue-400 text-xs">¥{productionTiers[category][tier].cost.toLocaleString()}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-700">
                    <h4 className="font-bold text-lg text-center mb-3 dark:text-gray-200">Release Format</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                        <label className={`p-4 border rounded-lg cursor-pointer ${releaseFormat === 'digital' ? 'bg-blue-100 border-blue-400 ring-2 ring-blue-300' : 'bg-gray-50 dark:bg-gray-800'}`}>
                            <div className="flex items-center">
                                <input type="radio" name="release-format" value="digital" checked={releaseFormat === 'digital'} onChange={(e) => setReleaseFormat(e.target.value)} className="form-radio h-5 w-5 text-blue-600"/>
                                <div className="ml-3">
                                    <p className="font-bold text-md">{releaseType === 'album' ? 'Digital Album' : 'Digital Single'}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Standard release on streaming platforms.</p>
                                </div>
                            </div>
                        </label>
                        <label className={`p-4 border rounded-lg cursor-pointer ${releaseFormat === 'physical' ? 'bg-green-100 border-green-400 ring-2 ring-green-300' : 'bg-gray-50 dark:bg-gray-800'}`}>
                            <div className="flex items-center">
                                <input type="radio" name="release-format" value="physical" checked={releaseFormat === 'physical'} onChange={(e) => setReleaseFormat(e.target.value)} className="form-radio h-5 w-5 text-green-600"/>
                                <div className="ml-3">
                                    <p className="font-bold text-md">{releaseType === 'album' ? 'Physical Album' : 'Physical Single'}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">A physical CD release. High cost, high reward.</p>
                                </div>
                            </div>
                        </label>
                    </div>

                    {releaseType === 'album' && (
                        <div className="mt-4 p-4 max-w-3xl mx-auto bg-purple-50 dark:bg-gray-800 rounded-lg text-center">
                            <h4 className="font-bold text-lg dark:text-gray-200">Album Production Costs</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                Base Cost (Digital): ¥{baseCostAlbum.toLocaleString()}
                                <br/>
                                Additional Cost (Physical): ¥{albumPhysicalSurcharge.toLocaleString()}
                            </p>
                        </div>
                    )}

                    {releaseFormat === 'physical' && releaseType === 'single' && (
                        <div className="mt-4 p-4 max-w-3xl mx-auto bg-green-50 dark:bg-gray-800 rounded-lg text-center">
                            <label className="font-semibold block mb-2 dark:text-gray-200">Number of Physical Versions</label>
                            <div className="flex items-center justify-center">
                                <input type="text" readOnly value={`${physicalVersions} Version(s)`} className="w-32 text-center p-1 font-bold bg-white dark:bg-gray-700 rounded-md border dark:border-gray-600"/>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Calculated automatically based on the number of "Type-Exclusive" B-sides.
                                <br />
                                Base Cost: ¥100,000 per version.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t dark:border-gray-700 space-y-4">
                    <div>
                        <h4 className="font-bold text-lg text-center mb-2 dark:text-gray-200">Schedule Release Date</h4>
                        <select value={releaseWeek} onChange={(e) => setReleaseWeek(Number(e.target.value))} className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600">
                            {Array.from({ length: 12 }, (_, i) => week + 4 + i).map(w => (
                                <option key={w} value={w}>Week {w} ({getFormattedDateForWeek(w)})</option>
                            ))}
                        </select>
                        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-1">Release will happen at the start of this week.</p>
                   
                        {releaseType === 'single' && (
                        <div className="mt-4 p-4 max-w-3xl mx-auto bg-yellow-50 dark:bg-gray-900/50 rounded-lg text-center border-2 border-dashed border-yellow-300 dark:border-yellow-700">
                            <label className="font-semibold flex items-center justify-center dark:text-gray-200 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isElectionSingle}
                                onChange={(e) => setIsElectionSingle(e.target.checked)}
                                className="form-checkbox h-5 w-5 text-yellow-600 mr-3 focus:ring-yellow-500"
                            />
                            Include General Election Ballots
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            This will turn this single into an Election Single. Final sales will determine the vote pool for the next election. Production costs will increase.
                            </p>

                        <div className="mt-4 p-4 max-w-3xl mx-auto bg-green-50 dark:bg-gray-900/50 rounded-lg text-center border-2 border-dashed border-green-300 dark:border-green-700">
                            <label className="font-semibold flex items-center justify-center dark:text-gray-200 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeHandshakeTickets}
                                onChange={(e) => setIncludeHandshakeTickets(e.target.checked)}
                                className="form-checkbox h-5 w-5 text-green-600 mr-3 focus:ring-green-500"
                            />
                            Include Handshake Event Tickets
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                            This will schedule a post-release handshake event. Production costs will increase by ¥300,000.
                            </p>
                        </div>


                        </div>
                        
                        )}
                   
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-900">
                        <button onClick={() => setStep('selection')} className="w-full md:w-auto p-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded px-4 font-bold order-3 md:order-1">Back</button>
                        <div className="text-center md:text-right order-2">
                            <p className="text-lg font-bold dark:text-gray-200">Total Production Cost: <span className={totalProductionCost > money ? 'text-red-500' : 'text-green-500'}>¥{totalProductionCost.toLocaleString()}</span></p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Your Balance: ¥{money.toLocaleString()}</p>
                        </div>
                            <button 
                                onClick={releaseType === 'album' ? handleConfirmAlbum : handleSchedule}
                                disabled={totalProductionCost > money || (releaseType !== 'album' && (!songName.trim() || tracks.some(t => t.members.length === 0)))}
                                className="w-full md:w-auto p-2 bg-green-500 text-white rounded disabled:bg-gray-400 px-6 font-bold text-lg order-1 md:order-3"
                            >
                                {releaseType === 'album' ? 'Produce Album' : 'Schedule Single'}
                            </button>
                    </div>
                </div>
            </>
        );

return (
    <ModalWrapper title={<span className="flex items-center"><Music size={24} className="mr-2"/> New Release Production</span>} maxWidth="max-w-7xl">
        {step === 'type' && renderTypeSelectionStep()}
        {step === 'selectGraduatingMember' && renderSelectGraduatingMemberStep()}
        {step === 'selection' && (releaseType === 'single' || releaseType === 'graduationSingle') && renderSelectionStep()}
        {step === 'selection' && releaseType === 'album' && renderAlbumSelectionStep()}
        {step === 'production' && renderProductionStep()}
    </ModalWrapper>
);
    };

    const PerformanceDetailsModal = () => {
      const performance = modalData;
      if (!performance) return null;

      // --- RENDER LOGIC ---
      let mainSongCount = 0;
      let encoreSongCount = 0;
      let inEncore = false;
      
      return (
<ModalWrapper title={performance.name || 'Performance Details'} maxWidth="max-w-full md:max-w-3xl">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-3 space-y-1">
                  <p>Category: <span className="font-semibold">{performance.category}</span> | Date: <span className="font-semibold">{getFormattedDateForWeek(performance.week)}</span></p>

                  
                  {performance.targetGroup && <p>Group: <span className="font-semibold">{performance.targetGroup === 'main' ? groupName : performance.targetGroup}</span></p>}
                  
                  {performance.venueName && <p>Venue: <span className="font-semibold">{performance.venueName}</span></p>}
              
                  {performance.attendance != null && performance.capacity > 0 && 
                      <p>Attendance: <span className="font-semibold">{performance.attendance.toLocaleString()} / {performance.capacity.toLocaleString()} ({Math.round((performance.attendance/performance.capacity)*100)}%)</span></p>
                  }
                  
                  <div className="pt-2">
                      <p>Revenue: <span className="font-semibold text-green-600 dark:text-green-400">¥{(performance.revenue || 0).toLocaleString()}</span></p>
                      <p>Cost: <span className="font-semibold text-red-600 dark:text-red-400">¥{(performance.cost || 0).toLocaleString()}</span></p>
                      {performance.profit != null &&
                          <p className="border-t dark:border-gray-600 mt-1 pt-1">Profit: <span className={`font-bold ${performance.profit >= 0 ? 'text-green-700 dark:text-green-500' : 'text-red-700 dark:text-red-500'}`}>¥{performance.profit.toLocaleString()}</span></p>
                      }
                  </div>
                  
                  {performance.fansGained > 0 && <p className="pt-1">New Fans: <span className="font-semibold text-blue-600 dark:text-blue-400">+{performance.fansGained.toLocaleString()}</span></p>}
              
                  {(performance.kageAna || performance.shimeAna) && <div className="pt-2 mt-1 border-t dark:border-gray-600">
                      {performance.kageAna && <p>Kage-ana: <span className="font-semibold">{performance.kageAna}</span></p>}
                      {performance.shimeAna && <p>Shime-ana: <span className="font-semibold">{performance.shimeAna}</span></p>}
                  </div>}
              </div>

              <h4 className="font-semibold text-lg mb-2 border-t pt-3 flex items-center dark:text-gray-100"><Music size={18} className="mr-2"/> Final Setlist ({(performance.tracks || []).length} items)</h4>
              <div className="space-y-1 max-h-64 overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-800">
                  {(performance.tracks || []).map((item, index) => {
                      let label, labelColor, content;
                      if (item.type === 'encore') inEncore = true;

                      if (item.type === 'song') {
                          if (inEncore) { encoreSongCount++; label = `EN${encoreSongCount}`; } else { mainSongCount++; label = `M${mainSongCount < 10 ? '0' : ''}${mainSongCount}`; }
                          content = item.item.name;
                          labelColor = 'text-blue-600 dark:text-blue-400';
                      } else if (item.type === 'mc') {
                          label = 'MC';
                          content = item.name;
                          if (item.hasAnnouncement) content += " (Announcement)";
                          labelColor = 'text-green-600 dark:text-green-400';
                      } else if (item.type === 'encore') {
                          label = '---';
                          content = 'ENCORE BREAK';
                          labelColor = 'text-yellow-600 dark:text-yellow-400 font-black';
                      } else { // Fallback for old data
                          label = `M.${index + 1}`;
                          content = typeof item === 'object' && item.name ? item.name : String(item);
                          labelColor = 'text-gray-500';
                      }
                      
                      return (
                        <div key={index} className="p-1.5 border-b dark:border-gray-700 flex items-center">
                            <span className={`font-black w-12 text-sm ${labelColor}`}>{label}</span>
                            <span className="font-medium text-sm dark:text-gray-200">{content}</span>
                        </div>
                      );
                  })}
                   {(!performance.tracks || performance.tracks.length === 0) && <p className="text-gray-500 italic p-1">No tracks recorded.</p>}
              </div>

<h4 className="font-semibold text-lg mb-2 border-t pt-3 mt-3 flex items-center dark:text-gray-100"><Users size={18} className="mr-2"/> Performers ({(performance.members || []).length})</h4>
            <div className="text-sm p-2 border rounded max-h-48 overflow-y-auto bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
                {(() => {
                    if (!performance.members || performance.members.length === 0) {
                        return <p className="text-gray-500 italic">No members recorded.</p>;
                    }
                    
                    // This handles old history entries that only stored names
                    if (typeof performance.members[0] === 'string' && !String(performance.members[0]).match(/^sg-/)) {
                        return <p>{performance.members.join(', ')}</p>
                    }

const memberObjects = performance.members.map(id => getMemberById(id)).filter(Boolean);

const memberGroups = memberObjects.reduce((acc, member) => {
    if (!member) return acc;
    let groupKey;
    const mainGroupName = groupName || 'Hoshimi01';

    if (member.isKennin) {
        const kenninGroup = (member.kenninGroups && member.kenninGroups.length > 0) ? member.kenninGroups[0] : 'Kennin';
        const baseGroup = member.teamName ? `Team ${member.teamName}` : (member.homeGroup || mainGroupName);
        groupKey = `${baseGroup} / ${kenninGroup}`;

    } else if (member.isSisterMember) {
        const sgName = member.displayGroupName || 'Sister Group';
        if (member.teamName) {
            groupKey = `${sgName} Team ${member.teamName}`;
        } else {
            groupKey = `${sgName} Kenkyuusei`;
        }
    } else { // Main group members
        if (member.teamName) {
            groupKey = `Team ${member.teamName}`;
        } else {
            groupKey = `${mainGroupName} Kenkyuusei`;
        }
    }

    if (!acc[groupKey]) {
        acc[groupKey] = [];
    }
    acc[groupKey].push(member);
    return acc;
}, {});
                    return (
                        <div className="space-y-2">
                            {Object.entries(memberGroups).sort((a, b) => a[0].localeCompare(b[0])).map(([groupKeyName, membersInGroup]) => (
                                <div key={groupKeyName}>
                                    <p className="font-semibold text-pink-600 dark:text-pink-400">
                                        {groupKeyName}: <span className="font-normal text-gray-700 dark:text-gray-300">
                                            {membersInGroup.map(m => m.name).join(', ')}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    );
                })()}
            </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                  <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Close</button>
              </div>
          </ModalWrapper>
      );
    };

    const ReleaseDetailsModal = () => {
        const release = modalData;
        if (!release) return null;

            // --- FIXED HELPER VARIABLES ---
            const memberMap = {};
    
            // FIRST: Load the historical members from the single itself. This is the most accurate data and includes rivals.
            (release.tracks || []).flatMap(t => t.members || []).forEach(m => {
                memberMap[String(m.id)] = m;
            });
    
            // SECOND: Add any currently active members as a fallback, but DO NOT overwrite the historical data.
            getAllAvailableMembers(true).forEach(m => {
                if (!memberMap[String(m.id)]) {
                    memberMap[String(m.id)] = m;
                }
            });

        const releasingGroupName = release.targetGroup === 'main' ? groupName : (sisterGroups.find(sg => String(sg.id) === String(release.targetGroup))?.name || release.targetGroup);
        
            // Correctly calculates total sales from the sales history
            const totalSales = (release.salesHistory || []).reduce((sum, entry) => sum + entry.sales, 0);
            const totalRevenue = totalSales * 15;
            const chartEntry = activeChart?.entries.find(e => e.id === release.id);

        // --- FIXED HELPER COMPONENTS ---
        const ProductionInfo = () => {
            const totalCost = Object.entries(release.production).reduce((acc, [key, value]) => {
                return acc + (productionTiers[key]?.[value]?.cost || 0);
            }, 0);

            return (
                <div className="p-3 border rounded-lg bg-gray-50 space-y-1 dark:bg-gray-700 dark:text-gray-300">
                    <h4 className="font-bold text-md mb-2 flex items-center text-gray-800 dark:text-gray-100"><Wrench size={16} className="mr-2"/> Production Summary</h4>
                    <ul className="text-sm">
                        {Object.keys(productionTiers).map(key => (
                            <li key={key}>
                                <span className="font-semibold capitalize">{key}:</span> {productionTiers[key]?.[release.production[key]]?.name || 'N/A'}
                            </li>
                        ))}
                    </ul>
                    <p className="font-bold text-sm mt-3 pt-2 border-t">Total Production Cost: ¥{totalCost.toLocaleString()}</p>
                </div>
            );
        };
        
        const TeamGroupedLineup = ({ track }) => {
            if (!track || !track.members || track.members.length === 0) return null;

            // This handles old history entries that might just have IDs
            if (typeof track.members[0] !== 'object') {
                return <p className="text-sm italic mt-2 text-gray-500">Could not load historical team data for this old entry.</p>;
            }

            const memberGroups = track.members.reduce((acc, member) => {
                if (!member) return acc;
                let groupKey;
                const mainGroupName = groupName || 'Hoshimi01';

                if (member.isExchangeStudent) {
                    // If an exchange student is on a team, show that. Otherwise, label them by their home group.
                    groupKey = member.teamName 
                        ? `${mainGroupName} Team ${member.teamName}` 
                        : `${member.homeGroup} (Exchange)`;
                } else if (member.isSisterMember) {
                    const sgName = member.displayGroupName || 'Sister Group';
                    // If a sister member has a team, show the team name. Otherwise, they are a trainee.
                    groupKey = member.teamName 
                        ? `${sgName} Team ${member.teamName}` 
                        : `${sgName} Kenkyuusei`;
                } else {
                    // If a main group member has a team, show the team name. Otherwise, they are a trainee.
                    groupKey = member.teamName 
                        ? `${mainGroupName} Team ${member.teamName}` 
                        : `${mainGroupName} Kenkyuusei`;
                }
                
                if (!acc[groupKey]) {
                    acc[groupKey] = [];
                }
                acc[groupKey].push(member);
                return acc;
            }, {});

            const centerMemberIds = Array.isArray(track.center) ? track.center.map(String) : [String(track.center)];

            return (
                <div className="mt-3 pt-3 border-t border-dashed dark:border-gray-600">
                    {Object.keys(memberGroups)

.sort((a, b) => {
    const mainGroupName = groupName || 'Hoshimi01'; // A safe fallback

    const getScore = (key) => {
        const isMain = key.startsWith(mainGroupName);
        const isKKS = key.includes('Kenkyuusei');

        if (isMain && !isKKS) return 1;  // Main Group Team
        if (isMain && isKKS) return 2;   // Main Group KKS
        if (!isMain && !isKKS) return 3; // Sister Group Team
        if (!isMain && isKKS) return 4;  // Sister Group KKS
        return 5; // Fallback for any other cases
    };

    const scoreA = getScore(a);
    const scoreB = getScore(b);

    if (scoreA !== scoreB) {
        return scoreA - scoreB;
    }

    // If groups have the same score (e.g., two sister group teams), sort them alphabetically
    return a.localeCompare(b);
})
                        .map(groupKeyName => (
                        <div key={groupKeyName} className="mt-1 text-sm">
                            <p className="font-semibold text-pink-600 dark:text-pink-400">
                                {groupKeyName}: <span className="font-normal text-gray-700 dark:text-gray-300">
                                    {memberGroups[groupKeyName].map(member => (
                                        <span key={member.rosterId} className={centerMemberIds.includes(String(member.id)) ? 'font-bold' : ''}>
                                            {member.name}
                                        </span>
                                    )).reduce((prev, curr) => [prev, ', ', curr])}
                                </span>
                            </p>
                        </div>
                    ))}
                </div>
            );
        };
    const Trivia = () => {
        // --- NEW: Prioritize pre-generated trivia from the release object ---
        if (release.trivia && release.trivia.length > 0) {
            return (
                <div className="mt-6">
                    <h3 className="text-lg font-bold mb-2 flex items-center dark:text-gray-200 pt-3 border-t">
                        <Gift size={20} className="mr-2"/> Trivia
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                        {release.trivia.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            );
        }
    
        // --- FALLBACK: Original logic for older save files without pre-generated trivia ---
        const triviaItems = [];

        // --- NEW: Graduation Single Trivia ---
        if (release.isGraduationSingle) {
            const titleTrack = release.tracks.find(t => t.type === 'title');
            if (titleTrack && titleTrack.center && titleTrack.center.length > 0) {
                const centerId = String(titleTrack.center[0]);
                // Find the member's name from the track data itself, as it's more reliable here
                const centerMemberObject = (titleTrack.members || []).find(m => String(m.id) === centerId);

                if (centerMemberObject) {
                    const gradMemberName = centerMemberObject.name;
                    triviaItems.push(`Final Single Participation of ${gradMemberName}.`);
                    triviaItems.push(`Last Senbatsu of ${gradMemberName}.`);
                    triviaItems.push(`Final A-Side Center of ${gradMemberName}.`);
                }
            }
        }
        // --- END NEW ---

        const formatNames = (nameArray) => {
            if (nameArray.length === 0) return '';
            if (nameArray.length === 1) return nameArray[0];
            if (nameArray.length === 2) return nameArray.join(' and ');
            return nameArray.slice(0, -1).join(', ') + ', and ' + nameArray.slice(-1);
        };
    
        const titleTrack = release.tracks.find(t => t.type === 'title');
        
        if (titleTrack) {
            const firstTimeSenbatsu = (titleTrack.members || []).map(m => memberMap[String(m.id)]).filter(member => 
                member && (member.singlesParticipation || []).filter(p => p.isTitleTrackSenbatsu).length === 1
            );
    
            if (firstTimeSenbatsu.length > 0) {
                triviaItems.push(`First Time Senbatsu of ${formatNames(firstTimeSenbatsu.map(m => m.name))}.`);
            }
    
            if (titleTrack.center && titleTrack.center.length > 0) {
                const firstTimeACenters = titleTrack.center
                    .map(id => memberMap[String(id)])
                    .filter(member => {
                        if (!member) return false;
                        const titleCenterCount = (member.centerHistory || []).filter(h => h.type === 'title').length;
                        return titleCenterCount === 1;
                    });
                if (firstTimeACenters.length > 0) {
                    triviaItems.push(`First A-Side Single Center of ${formatNames(firstTimeACenters.map(m => m.name))}.`);
                }
            }

            // --- ADDED: Dropped from Senbatsu Logic for Fallback ---
            const songListOfGroup = release.targetGroup === 'main' ? songs : (sisterGroups.find(sg => sg.name === release.targetGroup)?.songs || []);
            const previousSingle = songListOfGroup.filter(s => s.type === 'single' && s.releaseWeek < release.releaseWeek).sort((a,b) => b.releaseWeek - a.releaseWeek)[0];

            if (previousSingle) {
                const prevTitleTrack = previousSingle.tracks.find(t => t.type === 'title');
                if (prevTitleTrack) {
                    const prevSenbatsuIds = (prevTitleTrack.members || []).map(m => String(m.id));
                    const currentSenbatsuIds = (titleTrack.members || []).map(m => String(m.id));
                    const droppedMemberIds = prevSenbatsuIds.filter(id => !currentSenbatsuIds.includes(id));
                    
                    if (droppedMemberIds.length > 0) {
                        const droppedMemberNames = droppedMemberIds.map(id => {
                            const member = getMemberById(id);
                            return member ? member.name : '';
                        }).filter(Boolean);
                        
                        if (droppedMemberNames.length > 0) {
                            triviaItems.push(`Dropped from Senbatsu: ${formatNames(droppedMemberNames)}.`);
                        }
                    }
                }
            }
        }
        
        const allParticipatingIds = [...new Set(release.tracks.flatMap(t => (t.members || []).map(m => m.id)))];
        const firstTimeParticipation = allParticipatingIds.map(id => memberMap[String(id)]).filter(member =>
            member && (member.singlesParticipation || []).filter(p => p.singleId === release.id).length > 0 && (member.singlesParticipation || []).length === 1
        );
    
        if (firstTimeParticipation.length > 0) {
            triviaItems.push(`First Single Participation of ${formatNames(firstTimeParticipation.map(m => m.name))}.`);
        }
    
        const bSideTracks = release.tracks.filter(t => t.type === 'b-side');
        const firstTimeBSideCenters = bSideTracks
            .map(track => track.center ? memberMap[String(track.center)] : null)
            .filter(member => {
                if (!member) return false;
                const bSideCenterCount = (member.centerHistory || []).filter(h => h.type === 'b-side').length;
                return bSideCenterCount === 1;
            });
    
        if (firstTimeBSideCenters.length > 0) {
            const uniqueNames = [...new Set(firstTimeBSideCenters.map(m => m.name))];
            triviaItems.push(`First B-Side Center of ${formatNames(uniqueNames)}.`);
        }
    
        if (triviaItems.length === 0) return null;
    
        return (
            <div className="mt-6">
                <h3 className="text-lg font-bold mb-2 flex items-center dark:text-gray-200 pt-3 border-t">
                    <Gift size={20} className="mr-2"/> Trivia
                </h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                    {triviaItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };

        return (
            <ModalWrapper title={`${release.name} - ${release.type === 'album' ? 'Album' : 'Single'} Details`} maxWidth="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="p-3 border rounded-lg bg-gray-50 space-y-2 dark:text-gray-900">
                      <p><strong>Released by:</strong> {releasingGroupName}</p>
                      <p><strong>Release Date:</strong> {getFormattedDateForWeek(release.releaseWeek)}</p>
                      <p><strong>Total Sales:</strong> {totalSales.toLocaleString()}</p>
                      <p><strong>Total Revenue:</strong> <span className="font-bold text-green-600">¥{totalRevenue.toLocaleString()}</span></p>
                      <p><strong>Charting Status:</strong> 
                          {release.chartWeeksLeft > 0 ? 
                              <span className="font-semibold text-green-700"> {release.chartWeeksLeft} weeks left</span> : 
                              <span className="text-gray-500"> Finished</span>}
                      </p>
                       {release.baseSalesPotential > 0 && (
                           <p><strong>Base Sales Potential:</strong> {Math.floor(release.baseSalesPotential).toLocaleString()}</p>
                      )}
                  </div>
                  <ProductionInfo />
                </div>
  
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {(release.salesHistory || []).length > 0 && (
                      <div>
                          <h4 className="font-semibold text-lg mb-2 border-t pt-3 flex items-center dark:text-gray-100"><DollarSign size={18} className="mr-2 text-green-500"/> Weekly Sales</h4>
                          <div className="max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border">
                            <ul className="text-sm space-y-1">
                                {release.salesHistory.map((entry, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>Week {entry.week}:</span>
                                        <span className="font-mono">{entry.sales.toLocaleString()} units</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                      </div>
                    )}
                    {(release.rankHistory || []).length > 0 && (
                      <div>
                          <h4 className="font-semibold text-lg mb-2 border-t pt-3 flex items-center dark:text-gray-100"><BarChart2 size={18} className="mr-2 text-pink-500"/> Weekly Rank</h4>
                          <div className="max-h-32 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-2 rounded-lg border">
                            <ul className="text-sm space-y-1">
                                {release.rankHistory.map((entry, index) => (
                                    <li key={index} className="flex justify-between">
                                        <span>Week {entry.week}:</span>
                                        <span className="font-mono font-bold text-pink-500">#{entry.rank}</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                      </div>
                    )}
                </div>
  
                <div className="mt-4">
                    <h3 className="text-lg font-bold mb-2 flex items-center dark:text-gray-200 pt-3 border-t">
                        <Music size={20} className="mr-2"/> Track Listing ({release.tracks.length})
                    </h3>
                    <div className="space-y-3">
                        {/* FIX: First check if it's a single before checking formats */}
                        {release.type === 'single' ? (
                            // Your original logic for singles, with 'single' changed to 'release'
                            release.releaseFormat === 'physical' ? (
                                (() => {
                                    const commonTracks = release.tracks.filter(t => t.type === 'title' || t.cdType === 'common');
                                    const exclusiveTracks = release.tracks.reduce((acc, track) => {
                                        if (track.cdType && track.cdType !== 'common') {
                                            if (!acc[track.cdType]) acc[track.cdType] = [];
                                            acc[track.cdType].push(track);
                                        }
                                        return acc;
                                    }, {});
  
                                    const TrackCard = ({ track, exclusiveType }) => {
                                        const centerNames = Array.isArray(track.center)
                                        ? track.center.map(id => memberMap[String(id)]?.name).filter(Boolean).join(', ')
                                        : (track.center && memberMap[String(track.center)] ? memberMap[String(track.center)].name : 'N/A');                                        const rows = { '1st Row': [], '2nd Row': [], '3rd Row': [], '4th Row': [], '5th Row': [] };
                                        const unassigned = [];
                                            if (track.lineup && track.members) {
                                                track.members.forEach(memberObject => {
                                                    const row = track.lineup[String(memberObject.id)];
                                                    if (row && rows[row]) {
                                                        rows[row].push(memberObject.name);
                                                    } else {
                                                        unassigned.push(memberObject.name);
                                                    }
                                                });
                                            
                                        } else if (track.members) {
                                            track.members.forEach(memberId => {
                                                const member = memberMap[String(memberId)];
                                                if (member) unassigned.push(member.name);
                                            });
                                        }
  
                                        return (
                                            <div className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm mb-3">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="text-md font-bold text-gray-800 dark:text-gray-100">
                                                        {track.name}
                                                        {track.unitName && <span className="font-normal italic text-gray-600 dark:text-gray-400"> / {track.unitName}</span>}
                                                    </h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${
                                                        exclusiveType ? 'bg-blue-200 text-blue-800' : 
                                                        track.type === 'title' ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'
                                                    }`}>
                                                        {exclusiveType ? `TYPE ${exclusiveType} EXCLUSIVE` : (track.type === 'title' ? 'TITLE' : 'COMMON B-SIDE')}
                                                    </span>
                                                </div>
                                                
                                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                    <p><span className="font-semibold">Center:</span> {centerNames}</p>                                                    
                                                    <p><span className="font-semibold">Senbatsu Count:</span> {track.members ? track.members.length : 0}</p>
                                                    {Object.entries(rows).map(([rowName, members]) => members.length > 0 && (
                                                        <p key={rowName}><span className="font-semibold">{rowName}:</span> {members.join(', ')}</p>
                                                    ))}
                                                    {unassigned.length > 0 && (
                                                        <p><span className="font-semibold">Members:</span> {unassigned.join(', ')}</p>
                                                    )}
                                                </div>
                                                <TeamGroupedLineup track={track} />
                                            </div>
                                        );
                                    };
  
                                    return (
                                        <div>
                                            {commonTracks.map((track, index) => <TrackCard key={`common-${index}`} track={track} />)}
                                            {Object.entries(exclusiveTracks).map(([type, tracksOfType]) => (
                                                <div key={type}>
                                                    {tracksOfType.map((track, index) => <TrackCard key={`exclusive-${type}-${index}`} track={track} exclusiveType={type} />)}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })()
                            ) : (                          
                                release.tracks.map((track, index) => {
                                    const centerNames = Array.isArray(track.center)
                                        ? track.center.map(id => memberMap[String(id)]?.name).filter(Boolean).join(', ')
                                        : (track.center && memberMap[String(track.center)] ? memberMap[String(track.center)].name : 'N/A');

                                    const rows = { '1st Row': [], '2nd Row': [], '3rd Row': [], '4th Row': [], '5th Row': [] };
                                    const unassigned = [];
                                    if (track.lineup && track.members) {
                                        track.members.forEach(memberObject => {
                                            const row = track.lineup[String(memberObject.id)];
                                            if (row && rows[row]) {
                                                rows[row].push(memberObject.name);
                                            } else {
                                                unassigned.push(memberObject.name);
                                            }
                                        });

                                    } else if (track.members) {
                                        track.members.forEach(memberId => {
                                            const member = memberMap[String(memberId)];
                                            if (member) unassigned.push(member.name);
                                        });
                                    }

                                    return (
                                        <div key={index} className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                                            <div className="flex justify-between items-start">
                                                <h4 className="text-md font-bold text-gray-800 dark:text-gray-100">
                                                    {track.name}
                                                    {track.unitName && <span className="font-normal italic text-gray-600 dark:text-gray-400"> / {track.unitName}</span>}
                                                </h4>
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${track.type === 'title' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                                    {track.type || 'TRACK'}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                                <p><span className="font-semibold">Center:</span> {centerNames || 'N/A'}</p>
                                                <p><span className="font-semibold">Senbatsu Count:</span> {track.members ? track.members.length : 0}</p>
                                                {Object.entries(rows).map(([rowName, members]) => { if (members.length > 0) { return ( <p key={rowName}><span className="font-semibold">{rowName}:</span> {members.join(', ')}</p> ); } return null; })}
                                                {unassigned.length > 0 && ( <p><span className="font-semibold">Members:</span> {unassigned.join(', ')}</p> )}
                                            </div>
                                            <TeamGroupedLineup track={track} />
                                        </div>
                                    );
                                })
                          )
                        ) : (
                        // UNIFIED LOGIC: Display all tracks with full details
                        release.tracks.map((track, index) => {
                              const centerMember = track.center ? memberMap[String(track.center)] : null;
                              const rows = { '1st Row': [], '2nd Row': [], '3rd Row': [], '4th Row': [], '5th Row': [] };
                              const unassigned = [];
                              if (track.lineup && track.members) {
                                  track.members.forEach(memberId => {
                                      const member = memberMap[String(memberId)];
                                      if (member) {
                                          const row = track.lineup[String(memberId)];
                                          if (row && rows[row]) { rows[row].push(member.name); } else { unassigned.push(member.name); }
                                      }
                                  });
                              } else if (track.members) {
                                   track.members.forEach(memberId => {
                                      const member = memberMap[String(memberId)];
                                      if (member) unassigned.push(member.name);
                                   });
                              }
    
                              return (
                                  <div key={index} className="p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                                      <div className="flex justify-between items-start">
                                          <h4 className="text-md font-bold text-gray-800 dark:text-gray-100">
                                              {track.name}
                                              {track.unitName && <span className="font-normal italic text-gray-600 dark:text-gray-400"> / {track.unitName}</span>}
                                          </h4>
                                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold uppercase ${track.type === 'title' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                                              {track.type || 'TRACK'}
                                          </span>
                                      </div>
                                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                                          <p><span className="font-semibold">Center:</span> {centerMember ? centerMember.name : 'N/A'}</p>
                                          <p><span className="font-semibold">Senbatsu Count:</span> {track.members ? track.members.length : 0}</p>
                                          {Object.entries(rows).map(([rowName, members]) => { if (members.length > 0) { return ( <p key={rowName}><span className="font-semibold">{rowName}:</span> {members.join(', ')}</p> ); } return null; })}
                                          {unassigned.length > 0 && ( <p><span className="font-semibold">Members:</span> {unassigned.join(', ')}</p> )}
                                      </div>
                                      <TeamGroupedLineup track={track} />
                                  </div>
                              );
                          })
                        )}
                  </div>
                  {/* FIX: Conditionally render Trivia only for singles */}
                  {release.type === 'single' && <Trivia />}
                </div>
            </ModalWrapper>
        );
      };
    
    // NEW: Performance Selection Modal (Consolidates large concerts/tours)
    const PerformanceModal = () => {
    // --- STATE ---
    const [performanceName, setPerformanceName] = useState('');
    const [selectedTypeLabel, setSelectedTypeLabel] = useState(null);
    const [setlist, setSetlist] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All');
    // MODIFIED: This is the only state change needed.
    const [memberFilter, setMemberFilter] = useState('all');
    
    // --- DERIVED DATA ---
    const selectedTypeData = performanceTypes.find(p => p.label === selectedTypeLabel);
    
    const allTracks = [
        ...[...songs, ...sisterGroups.flatMap(sg => sg.songs || [])].flatMap(s => (s.tracks || []).map(t => {
            const releaseType = s.type === 'album' ? 'Album' : 'Single';
            const releaseArtist = s.artist || (s.targetGroup === 'main' ? groupName : s.targetGroup);
            return {
                id: `${s.id}-${t.name}-${releaseArtist}`,
                name: `${t.name} (${releaseType}: ${s.name})`,
                type: 'release'
            };
        })),
        ...(theaterSongs || []).map(song => {
            const originalSetlist = allSetlists.find(s => s.id === song.originalSetlistId);
            return {
                id: `theater-${song.id}`,
                name: `${song.name} (Theater - ${originalSetlist ? originalSetlist.name : 'Original'})`,
                item: { id: song.id, name: song.name },
                type: 'theater'
            };
        })
    ];
    
    const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable); 
    const categories = ['All', ...new Set(performanceTypes.map(p => p.category))];
    const filteredTypes = filterCategory === 'All' ? performanceTypes : performanceTypes.filter(p => p.category === filterCategory);

    // --- NEW: Generate structured data for the new filter ---
const mainGroupGenerations = [...new Set(availableMembers.filter(m => !m.isSisterMember).map(m => m.generation).filter(Boolean))];
const sisterGroupDetails = sisterGroups.map(sg => ({
    ...sg,
    generations: [...new Set(availableMembers.filter(m => m.groupId === sg.id).map(m => m.generation).filter(Boolean))]
}));

    // --- NEW: Logic to filter members based on the detailed dropdown selection ---
let filteredMembers = availableMembers;
if (memberFilter !== 'all') {
    if (memberFilter.startsWith('team-')) {
        const teamId = parseInt(memberFilter.replace('team-', ''), 10);
        const selectedTeam = teams.find(t => t.id === teamId);

        if (!selectedTeam) {
            filteredMembers = [];
        } else {
            filteredMembers = availableMembers.filter(member => {
                // Primary requirement: Member must be in the selected team. (Using String() for type safety)
                if (String(member.teamId) !== String(teamId)) {
                    return false;
                }

                // Secondary requirement: Member must belong to the correct group for that team.
                const isMainGroupTeam = selectedTeam.groupId === 'main';

                if (isMainGroupTeam) {
                    // For a main group team, only show main group members.
                    return !member.isSisterMember;
                } else {
                    // For a sister group team, only show members from that specific sister group.
                    // Coercing both to String() prevents type-related comparison errors.
                    return String(member.groupId) === String(selectedTeam.groupId);
                }
            });
        }
    } else if (memberFilter === 'main') {
        filteredMembers = availableMembers.filter(m => !m.isSisterMember);
    } else if (memberFilter.startsWith('main-gen-')) {
        const gen = memberFilter.replace('main-gen-', '');
        filteredMembers = availableMembers.filter(m => !m.isSisterMember && m.generation === gen);
    } else if (memberFilter.startsWith('sg-')) {
        if (memberFilter.includes('-gen-')) {
            const [sgIdStr, gen] = memberFilter.replace('sg-', '').split('-gen-');
            const sgId = parseInt(sgIdStr, 10);
            filteredMembers = availableMembers.filter(m => m.groupId === sgId && m.generation === gen);
        } else {
            const sgId = parseInt(memberFilter.replace('sg-', ''), 10);
            filteredMembers = availableMembers.filter(m => m.groupId === sgId);
        }
    }
}

    // --- SETLIST MANIPULATION ---
    const addTrackToSetlist = (trackId) => {
        const trackToAdd = allTracks.find(t => t.id === trackId);
        if(trackToAdd) {
            setSetlist(prev => [...prev, { type: 'song', item: { id: trackToAdd.id, name: trackToAdd.name } }]);
        }
    };
    const addSpecialItemToSetlist = (itemType) => {
        if (itemType === 'encore' && setlist.some(item => item.type === 'encore')) return setMessage("Encore break can only be added once.");
        let newItem = itemType === 'mc' ? { type: 'mc', name: `MC ${setlist.filter(i => i.type === 'mc').length + 1}`, hasAnnouncement: false } : { type: itemType };
        setSetlist(prev => [...prev, newItem]);
    };
    const updateSetlistItem = (index, newProps) => setSetlist(prev => prev.map((item, i) => i === index ? { ...item, ...newProps } : item));
    const removeSetlistItem = (index) => setSetlist(prev => prev.filter((_, i) => i !== index));
    const moveSetlistItem = (index, direction) => {
        if ((index === 0 && direction === -1) || (index === setlist.length - 1 && direction === 1)) return;
        setSetlist(prev => {
            const newList = [...prev];
            const item = newList.splice(index, 1)[0];
            newList.splice(index + direction, 0, item);
            return newList;
        });
    };

    // --- MEMBER & EXECUTION ---
    const toggleMember = (memberId) => setSelectedMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
    // MODIFIED: These now correctly use the filtered list
    const selectAllMembers = () => setSelectedMembers(prev => [...new Set([...prev, ...filteredMembers.map(m => m.id)])]);
    const deselectAllMembers = () => {
        const filteredIds = new Set(filteredMembers.map(m => m.id));
        setSelectedMembers(prev => prev.filter(id => !filteredIds.has(id)));
    };
    
    const executePerformance = () => {
        if (!selectedTypeData) return setMessage("Please select a performance type.");
        // FIX: Corrected typo 'selectedTypeAta' to 'selectedTypeData' and removed non-existent 'targetGroup'
        recordPerformance(selectedTypeData, setlist, selectedMembers, performanceName);
    };

    // --- RENDER LOGIC ---
    let mainSongCount = 0, encoreSongCount = 0, inEncore = false;
    return (
        <ModalWrapper title={<span className="flex items-center"><ClipboardCheck size={24} className="mr-2"/> Schedule Performance</span>} maxWidth="max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{minHeight: '60vh'}}>
                {/* Col 1-3: Performance Type */}
                <div className="col-span-12 lg:col-span-3 space-y-3 lg:border-r pr-3 pb-4 border-b lg:border-b-0">
                    <div>
                        <h4 className="font-semibold mb-1 dark:text-gray-100">Performance Name (Optional)</h4>
                        <input type="text" value={performanceName} onChange={e => setPerformanceName(e.target.value)} placeholder="e.g., Weekly Showcase" className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200" />
                    </div>

                    <h4 className="font-semibold flex items-center dark:text-gray-100 pt-2"><Clock size={16} className='mr-1'/> 1. Select Type</h4>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {categories.map(cat => <button key={cat} onClick={() => setFilterCategory(cat)} className={`text-xs px-2 py-1 rounded-full font-semibold ${filterCategory === cat ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'}`}>{cat}</button>)}
                    </div>
                    <div className="h-[450px] overflow-y-auto space-y-2">
                        {filteredTypes.map(type => (
                            <div key={type.label} onClick={() => setSelectedTypeLabel(type.label)} className={`p-3 border rounded cursor-pointer ${selectedTypeLabel === type.label ? 'bg-indigo-100 border-indigo-500 ring-2 ring-indigo-300 dark:bg-indigo-900 dark:border-indigo-600' : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'}`} title={type.desc}>
                                <span className="font-bold block dark:text-gray-100">{type.label}</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">Cost: ¥{type.cost.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Col 4-7: Combined Setlist Builder */}
                <div className="col-span-12 lg:col-span-4 lg:border-r pr-3 pb-4 border-b lg:border-b-0">
                    <h4 className="font-semibold mb-2 flex justify-between dark:text-gray-100"><span>2. Design Setlist ({setlist.length})</span><button onClick={() => setSetlist([])} className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 font-bold">Clear</button></h4>
                    <div className="h-[550px] overflow-y-auto space-y-1 border p-2 rounded bg-gray-100 dark:bg-gray-800 mb-2">
                        {setlist.map((item, index) => {
                            let label, labelColor;
                            if (item.type === 'encore') inEncore = true;
                            if (item.type === 'song') {
                                if (inEncore) { encoreSongCount++; label = `EN${encoreSongCount}`; } else { mainSongCount++; label = `M${mainSongCount < 10 ? '0' : ''}${mainSongCount}`; }
                                labelColor = 'text-blue-600 dark:text-blue-400';
                            } else { label = item.type.toUpperCase(); labelColor = item.type === 'mc' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400 font-black'; }
                            
                            return (
                                <div key={index} className="p-1.5 border rounded bg-white dark:bg-gray-700 group flex items-center justify-between">
                                    <div className="flex items-center overflow-hidden flex-1"><span className={`font-black w-12 text-sm ${labelColor}`}>{label}</span>
                                        {item.type === 'song' && <span className="font-medium text-sm truncate dark:text-gray-200">{item.item.name}</span>}
                                        {item.type === 'mc' && <input type="text" value={item.name} onChange={(e) => updateSetlistItem(index, { name: e.target.value })} className="text-sm p-0.5 border-b flex-1 bg-transparent dark:text-gray-200" />}
                                        {item.type === 'encore' && <span className="font-black text-sm text-yellow-600 dark:text-yellow-400">--- ENCORE ---</span>}
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 ml-2">
                                        {item.type === 'mc' && <label className="text-xs flex items-center dark:text-gray-300"><input type="checkbox" checked={item.hasAnnouncement} onChange={(e) => updateSetlistItem(index, { hasAnnouncement: e.target.checked })} className="mr-1"/>Ann?</label>}
                                        <button onClick={() => moveSetlistItem(index, -1)} disabled={index === 0} className="p-0.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 disabled:opacity-20"><ChevronUp size={14}/></button>
                                        <button onClick={() => moveSetlistItem(index, 1)} disabled={index === setlist.length - 1} className="p-0.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 disabled:opacity-20"><ChevronDown size={14}/></button>
                                        <button onClick={() => removeSetlistItem(index)} className="p-0.5 rounded-full bg-red-100 text-red-700 hover:bg-red-200"><X size={14}/></button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                        <select onChange={e => addTrackToSetlist(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"><option value="">-- Add Song --</option>{allTracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
                        <div><button onClick={() => addSpecialItemToSetlist('mc')} className="w-1/2 p-2 text-xs font-semibold bg-green-100 text-green-800 rounded-l hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800">Add MC</button><button onClick={() => addSpecialItemToSetlist('encore')} disabled={setlist.some(i => i.type === 'encore')} className="w-1/2 p-2 text-xs font-semibold bg-yellow-100 text-yellow-800 rounded-r hover:bg-yellow-200 disabled:opacity-50 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800">Add Encore</button></div>
                    </div>
                </div>

                {/* Col 8-12: Member Selection (Expanded) */}
                <div className="col-span-12 lg:col-span-5">
                    {/* --- MODIFIED: The entire member selection header is replaced with the new filter --- */}
                    <div className="flex justify-between items-center mb-2">
                         <h4 className="font-semibold dark:text-gray-100">3. Select Members ({selectedMembers.length})</h4>
                         <div>
                            <label htmlFor="member-filter" className="text-sm mr-2 dark:text-gray-300">Filter:</label>
<select id="member-filter" value={memberFilter} onChange={e => setMemberFilter(e.target.value)} className="p-1 rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 text-sm">
    <option value="all">All Available Members</option>
    
    {(teams || []).length > 0 && (
        <optgroup label="Teams">
            {teams.map(team => (
                <option key={`team-${team.id}`} value={`team-${team.id}`}>{team.name}</option>
            ))}
        </optgroup>
    )}

    <optgroup label="Groups">
        <option value="main">{groupName}</option>
        {sisterGroups.map(sg => (
            <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>
        ))}
    </optgroup>
    {mainGroupGenerations.length > 0 && (
        <optgroup label={`${groupName} Generations`}>
            {mainGroupGenerations.map(gen => (
                <option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>
            ))}
        </optgroup>
    )}
    {sisterGroupDetails.map(sg => (
        sg.generations.length > 0 && (
            <optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Generations`}>
                {sg.generations.map(gen => (
                    <option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>
                ))}
            </optgroup>
        )
    ))}
</select>
                         </div>
                    </div>
                     <div className="space-y-1 max-h-[500px] overflow-y-auto border-t border-b dark:border-gray-700 p-1">
                        {/* MODIFIED: This now maps over 'filteredMembers' */}
                        {filteredMembers.map(member => (
                            <div key={member.rosterId} className={`flex items-center justify-between p-2 rounded ${selectedMembers.includes(member.id) ? 'bg-blue-200 dark:bg-blue-800' : 'bg-white dark:bg-gray-800/50'}`}>
                                <div>
                                    <p className="font-semibold text-sm">{member.name}</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        Vo: {member.singing} Da: {member.dancing} Va: {member.variety} Fans: {getTotalFansForMember(member).toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    onClick={() => toggleMember(member.id)}
                                    className={`px-3 py-1 text-xs rounded font-semibold ${selectedMembers.includes(member.id) ? 'bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700 text-red-800 dark:text-red-100' : 'bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700 text-green-800 dark:text-green-100'}`}
                                >
                                    {selectedMembers.includes(member.id) ? 'Remove' : 'Add'}
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                        {/* MODIFIED: These buttons now respect the filter */}
                        <button onClick={selectAllMembers} className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700">Select Filtered</button>
                        <button onClick={deselectAllMembers} className="px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Deselect Filtered</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t">
                <div>
                  <p className="font-bold text-lg dark:text-gray-100">Cost: ¥{selectedTypeData ? selectedTypeData.cost.toLocaleString() : '0'}</p>
                </div>
                <div className="flex gap-2">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={executePerformance} disabled={!selectedTypeData || setlist.filter(i => i.type === 'song').length === 0 || selectedMembers.length === 0 || money < (selectedTypeData?.cost || 0)} className="p-3 bg-green-500 text-white rounded font-bold disabled:bg-gray-400">
                        Execute Performance
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};
    
const MajorConcertModal = () => {
    // --- STATE ---
    const [concertName, setConcertName] = useState('');
    const [kageAna, setKageAna] = useState('');
    const [shimeAna, setShimeAna] = useState('');
    const [selectedVenueId, setSelectedVenueId] = useState('');
    const [setlist, setSetlist] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [memberFilter, setMemberFilter] = useState('all');
    const [sPrice, setSPrice] = useState(0);
    const [aPrice, setAPrice] = useState(0);
    const [bPrice, setBPrice] = useState(0);
    // NEW: State for Joint Concerts
    const [isJointConcert, setIsJointConcert] = useState(false);
    const [participatingGroups, setParticipatingGroups] = useState(['main']);

    // --- DERIVED DATA & HOOKS ---
    const selectedVenue = venues.find(v => v.id === parseInt(selectedVenueId));
    const allGroups = [{ id: 'main', name: groupName }, ...(sisterGroups || [])];

    // Reset selections when participating groups change
    useEffect(() => {
        setSelectedMembers([]);
        setSetlist([]);
        setKageAna('');
        setShimeAna('');
        setMemberFilter('all');
    }, [participatingGroups]);

    // Update ticket prices when venue changes
    useEffect(() => {
        if (selectedVenue) {
            setSPrice(6000 + Math.floor(selectedVenue.capacity / 10));
            setAPrice(4000 + Math.floor(selectedVenue.capacity / 20));
            setBPrice(2500 + Math.floor(selectedVenue.capacity / 30));
        }
    }, [selectedVenue]);
    
    // Toggle a group's participation in a joint concert
    const handleGroupToggle = (groupId) => {
        setParticipatingGroups(prev => {
            if (prev.includes(groupId)) {
                return prev.length > 1 ? prev.filter(id => id !== groupId) : prev;
            }
            return [...prev, groupId];
        });
    };

    // Recalculate available members based on selected groups
    const availableMembers = getAllAvailableMembers(true).filter(member => {
        const groupIdsForMember = [
            member.isSisterMember ? String(member.groupId) : 'main',
            ...(member.kenninGroups || []).map(name => allGroups.find(g => g.name === name)?.id)
        ].filter(Boolean);
        return groupIdsForMember.some(id => participatingGroups.includes(id));
    });

    // Recalculate available songs based on selected groups
        const allGroupTracks = [
            ...songs
                .flatMap(s => (s.tracks || []).map(t => ({ id: `${s.id}-${t.name}`, name: `${t.name} (from ${s.name})`, item: { id: t.id, name: t.name } }))),
            ...sisterGroups
                        .flatMap(sg => (sg.songs || []).flatMap(s => (s.tracks || []).map(t => ({ id: `sg-${sg.id}-${s.id}-${t.name}`, name: `${t.name} (from ${s.name})`, item: { id: t.id, name: t.name } })))),
            ...(theaterSongs || []).map(song => ({ id: `theater-${song.id}`, name: `${song.name} (Theater)`, item: { id: song.id, name: song.name } }))
        ].filter((track, index, self) => index === self.findIndex((t) => t.id === track.id)); // Ensure unique tracks

    // Data for filter dropdown
    const mainGroupGenerations = [...new Set(availableMembers.filter(m => !m.isSisterMember).map(m => m.generation).filter(Boolean))];
    const sisterGroupDetails = sisterGroups.map(sg => ({
        ...sg,
        generations: [...new Set(availableMembers.filter(m => String(m.groupId) === String(sg.id)).map(m => m.generation).filter(Boolean))]
    }));

    // Corrected filtering logic
    let filteredMembers = availableMembers;
    if (memberFilter !== 'all') {
        if (memberFilter.startsWith('team-')) {
            const teamId = parseInt(memberFilter.replace('team-', ''), 10);
            const selectedTeam = teams.find(t => t.id === teamId);
            if (selectedTeam) {
                filteredMembers = availableMembers.filter(member => {
                    if (String(member.teamId) !== String(teamId)) return false;
                    const isMainGroupTeam = selectedTeam.groupId === 'main';
                    if (isMainGroupTeam) return !member.isSisterMember;
                    return String(member.groupId) === String(selectedTeam.groupId);
                });
            } else {
                filteredMembers = [];
            }
        } else if (memberFilter === 'main') {
            filteredMembers = availableMembers.filter(m => !m.isSisterMember);
        } else if (memberFilter.startsWith('main-gen-')) {
            const gen = memberFilter.replace('main-gen-', '');
            filteredMembers = availableMembers.filter(m => !m.isSisterMember && m.generation === gen);
        } else if (memberFilter.startsWith('sg-')) {
            if (memberFilter.includes('-gen-')) {
                const [sgIdStr, gen] = memberFilter.replace('sg-', '').split('-gen-');
                filteredMembers = availableMembers.filter(m => String(m.groupId) === sgIdStr && m.generation === gen);
            } else {
                const sgId = memberFilter.replace('sg-', '');
                filteredMembers = availableMembers.filter(m => String(m.groupId) === sgId);
            }
        }
    }

    // --- MANIPULATION & CONFIRMATION ---
    const addTrackToSetlist = (trackId) => {
        const track = allGroupTracks.find(t => t.id === trackId);
        if (track) setSetlist(prev => [...prev, { type: 'song', item: track.item }]);
    };
    const addSpecialItemToSetlist = (itemType) => {
        if (itemType === 'encore' && setlist.some(item => item.type === 'encore')) return setMessage("Encore break can only be added once.");
        let newItem = itemType === 'mc' ? { type: 'mc', name: `MC ${setlist.filter(i => i.type === 'mc').length + 1}`, hasAnnouncement: false } : { type: itemType };
        setSetlist(prev => [...prev, newItem]);
    };
    const updateSetlistItem = (index, newProps) => setSetlist(prev => prev.map((item, i) => i === index ? { ...item, ...newProps } : item));
    const removeSetlistItem = (index) => setSetlist(prev => prev.filter((_, i) => i !== index));
    const moveSetlistItem = (index, direction) => {
        if ((index === 0 && direction === -1) || (index === setlist.length - 1 && direction === 1)) return;
        setSetlist(prev => { const newList = [...prev]; const item = newList.splice(index, 1)[0]; newList.splice(index + direction, 0, item); return newList; });
    };

    const toggleMember = (memberId) => setSelectedMembers(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
    const selectAllFiltered = () => setSelectedMembers(prev => [...new Set([...prev, ...filteredMembers.map(m => m.id)])]);
    const deselectAllFiltered = () => {
        const filteredIds = new Set(filteredMembers.map(m => m.id));
        setSelectedMembers(prev => prev.filter(id => !filteredIds.has(id)));
    };
    
    const handleConfirm = () => {
        if (!selectedVenue || setlist.filter(i => i.type === 'song').length === 0 || selectedMembers.length < 5) {
            setMessage("A concert requires a venue, at least 5 members, and at least one song.");
            return;
        }
        const concertDetails = { name: concertName.trim(), kageAna: getMemberById(kageAna)?.name, shimeAna: getMemberById(shimeAna)?.name };
        const ticketPrices = { s: sPrice, a: aPrice, b: bPrice };
        const groupNames = participatingGroups.map(id => allGroups.find(g => g.id === id)?.name).filter(Boolean);
        // Pass array of group names to main function
        holdMajorConcert(selectedVenue, setlist, selectedMembers, groupNames, concertDetails, ticketPrices);
    };

    const cost = selectedVenue ? selectedVenue.cost + selectedVenue.maintenance : 0;
    let mainSongCount = 0, encoreSongCount = 0;

    const importRequestHourSetlist = () => {
        if (!lastRequestHourResult || !lastRequestHourResult.results) {
            setMessage("No Request Hour results available to import.");
            return;
        }

        const top100SongIds = [...lastRequestHourResult.results].reverse().map(r => r.songId);

        const newSetlist = top100SongIds.map(songId => {
            const track = allGroupTracks.find(t => t.id === songId);
            return track ? { type: 'song', item: track.item } : null;
        }).filter(Boolean);

        const finalSetlist = [];
        newSetlist.forEach((song, index) => {
            finalSetlist.push(song);
            if ((index + 1) % 4 === 0 && index < 15) {
                finalSetlist.push({ type: 'mc', name: `MC ${finalSetlist.filter(i => i.type === 'mc').length + 1}`, hasAnnouncement: false });
            }
        });

        const encoreIndex = finalSetlist.findIndex(item => item.item?.name === newSetlist[3]?.item?.name) + 1;
        if (encoreIndex > 0) {
            finalSetlist.splice(encoreIndex, 0, { type: 'encore' });
        }

        setSetlist(finalSetlist);
        setConcertName(`${new Date().getFullYear()} Request Hour Best 100`);
        setMessage("Request Hour Best 100 setlist has been imported!");
    };


    // --- RENDER LOGIC ---
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Plan Major Concert</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Details, Venue, Groups, Setlist */}
                    <div>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-1 dark:text-gray-100">Concert Name</h4>
                            <input type="text" value={concertName} onChange={(e) => setConcertName(e.target.value)} placeholder="e.g., 'First Light Tour'" className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200" />
                        </div>
                        <div className="mb-4">
                            <h4 className="font-semibold mb-1 dark:text-gray-100">Venue</h4>
                            <select value={selectedVenueId} onChange={(e) => setSelectedVenueId(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"><option value="">-- Select Venue --</option>{venues.map(v => (<option key={v.id} value={v.id}>{v.name} (Cap: {v.capacity.toLocaleString()})</option>))}</select>
                            {selectedVenue && <div className='mt-2 p-2 bg-yellow-100 dark:bg-yellow-900 rounded text-sm'><p className='font-bold text-red-600 dark:text-yellow-200'>COST: ¥{cost.toLocaleString()}</p></div>}
                        </div>
                        <div className="mb-4 p-3 border rounded">
                            <div className="flex items-center mb-2">
                                <input type="checkbox" id="jointConcertCheck" checked={isJointConcert} onChange={e => { setIsJointConcert(e.target.checked); if (!e.target.checked) setParticipatingGroups(['main']); }} className="h-4 w-4 rounded mr-2"/>
                                <label htmlFor="jointConcertCheck" className="font-semibold dark:text-gray-100">Joint Concert</label>
                            </div>
                            {isJointConcert ? (
                                <div className="grid grid-cols-2 gap-2">
                                    {allGroups.map(group => (
                                        <label key={group.id} className="flex items-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
                                            <input type="checkbox" checked={participatingGroups.includes(group.id)} onChange={() => handleGroupToggle(group.id)} className="h-4 w-4 rounded mr-2"/>
                                            <span>{group.name}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : (
                                <select value={participatingGroups[0]} onChange={e => setParticipatingGroups([e.target.value])} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200">
                                    {allGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                                </select>
                            )}
                        </div>

{/* --- START: Exclusive Concert Merchandise --- */}
{(selectedVenue || Object.values(eventMerchInventory || {}).some(stock => stock > 0)) && (
    <div className="my-4 pt-4 border-t">
        <h3 className="text-xl font-bold mb-4 text-purple-600 dark:text-purple-400">Exclusive Concert Merchandise</h3>
        <p className="text-sm text-gray-500 mb-4">Produce limited-edition items for the concert. This stock will be sold automatically during the show.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(eventMerchTiers).map(([itemType, tierInfo]) => {
                const currentStock = eventMerchInventory[itemType] || 0;
                const cost = tierInfo.cost * 100;

                return (
                    <div key={itemType} className="p-3 bg-purple-50 dark:bg-gray-700 rounded-lg shadow">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">{tierInfo.name}</span>
                            <span className="text-sm font-mono bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded">
                                In Stock: {currentStock.toLocaleString()}
                            </span>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 my-1">
                            A high-demand item that will sell well to concert attendees.
                        </p>
                        <button
                            onClick={() => produceEventMerch(itemType, 100)}
                            className="w-full mt-2 p-2 text-sm bg-purple-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={money < cost}
                        >
                            Produce 100 (Cost: ¥{cost.toLocaleString()})
                        </button>
                    </div>
                );
            })}
        </div>
    </div>
)}
{/* --- END: Exclusive Concert Merchandise --- */}

{/* --- START: Ticket Pricing UI (with correct safety check) --- */}
{selectedVenue && (
    <div className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 mb-4">
        <h4 className="font-semibold mb-2 dark:text-gray-100">Ticket Prices</h4>
        <div className="space-y-2">
            <div className="grid grid-cols-3 items-center gap-2">
                <label className="font-semibold text-sm dark:text-gray-300">S Zone</label>
                <input type="number" step="100" value={sPrice} onChange={e => setSPrice(parseInt(e.target.value))} className="p-1 border rounded col-span-2 text-center bg-white dark:bg-gray-800" />
                <small className="col-span-3 text-xs text-gray-500 text-center -mt-1">Recommended: ¥{(6000 + Math.floor(selectedVenue.capacity / 10)).toLocaleString()}</small>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
                <label className="font-semibold text-sm dark:text-gray-300">A Zone</label>
                <input type="number" step="100" value={aPrice} onChange={e => setAPrice(parseInt(e.target.value))} className="p-1 border rounded col-span-2 text-center bg-white dark:bg-gray-800" />
                <small className="col-span-3 text-xs text-gray-500 text-center -mt-1">Recommended: ¥{(4000 + Math.floor(selectedVenue.capacity / 20)).toLocaleString()}</small>
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
                <label className="font-semibold text-sm dark:text-gray-300">B Zone</label>
                <input type="number" step="100" value={bPrice} onChange={e => setBPrice(parseInt(e.target.value))} className="p-1 border rounded col-span-2 text-center bg-white dark:bg-gray-800" />
                <small className="col-span-3 text-xs text-gray-500 text-center -mt-1">Recommended: ¥{(2500 + Math.floor(selectedVenue.capacity / 30)).toLocaleString()}</small>
            </div>
        </div>
    </div>
)}
{/* --- END: Ticket Pricing UI --- */}


                        <div className="border p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold dark:text-gray-100">Setlist ({setlist.length})</h4>
                                {lastRequestHourResult && (
                                    <button
                                        onClick={importRequestHourSetlist}
                                        className="px-3 py-1 text-xs bg-cyan-500 text-white rounded font-semibold hover:bg-cyan-600"
                                    >
                                        Import Request Hour
                                    </button>
                                )}
                            </div>
                            <div className="max-h-40 overflow-y-auto mb-2 border-y dark:border-gray-700">
                                {setlist.map((item, index) => { let inEncore = setlist.slice(0, index).some(i => i.type === 'encore'); if (item.type === 'song') { if(inEncore) encoreSongCount++; else mainSongCount++; } return ( <div key={index} className="flex items-center p-1 border-b dark:border-gray-700 last:border-b-0"> <span className="font-bold text-gray-500 dark:text-gray-400 w-6">{index + 1}.</span> <div className="flex-grow"> {item.type === 'song' && (<span className='text-blue-600 dark:text-blue-400'>{item.item.name}</span>)} {item.type === 'mc' && (<div className='flex items-center'><span className='text-green-600 dark:text-green-400'>{item.name}</span><label className='ml-4 text-xs'><input type="checkbox" checked={item.hasAnnouncement} onChange={e => updateSetlistItem(index, { hasAnnouncement: e.target.checked })} className='mr-1' />Announce?</label></div>)} {item.type === 'vtr' && <span className='text-purple-600 dark:text-purple-400'>VTR</span>} {item.type === 'encore' && <span className='font-bold text-red-500 dark:text-red-400'>-- ENCORE --</span>} </div> <button onClick={() => moveSetlistItem(index, -1)} disabled={index===0} className="px-1 text-gray-400 disabled:opacity-20">↑</button> <button onClick={() => moveSetlistItem(index, 1)} disabled={index===setlist.length-1} className="px-1 text-gray-400 disabled:opacity-20">↓</button> <button onClick={() => removeSetlistItem(index)} className="px-2 text-red-500 font-bold">X</button> </div> ); })}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <select onChange={e => {addTrackToSetlist(e.target.value); e.target.value = ''}} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"><option value="">-- Add Song --</option>{allGroupTracks.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select>
                                <div><button onClick={() => addSpecialItemToSetlist('mc')} className="w-1/3 p-2 text-xs bg-green-200 hover:bg-green-300 dark:bg-green-800 dark:hover:bg-green-700 rounded-l">MC</button><button onClick={() => addSpecialItemToSetlist('vtr')} className="w-1/3 p-2 text-xs bg-purple-200 hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700">VTR</button><button onClick={() => addSpecialItemToSetlist('encore')} className="w-1/3 p-2 text-xs bg-red-200 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700 rounded-r">Encore</button></div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Members & Announcements */}
                    <div>
                        <div className="border p-2 rounded-lg bg-gray-50 dark:bg-gray-900 mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold dark:text-gray-100">Performing Members ({selectedMembers.length})</h4>
                                <select id="concert-member-filter" value={memberFilter} onChange={e => setMemberFilter(e.target.value)} className="p-1 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-xs">
                                    <option value="all">All</option>
                                    <optgroup label="Teams">{(teams || []).map(team => (<option key={`team-${team.id}`} value={`team-${team.id}`}>{team.name}</option>))}</optgroup>
                                    <optgroup label="Groups">
                                        <option key="main" value="main">{groupName}</option>
                                        {sisterGroups.map(sg => (<option key={sg.id} value={`sg-${sg.id}`}>{sg.name}</option>))}
                                    </optgroup>
                                    {mainGroupGenerations.length > 0 && <optgroup label={`${groupName} Gen`}>{mainGroupGenerations.map(gen => (<option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>))}</optgroup>}
                                    {sisterGroupDetails.map(sg => (sg.generations.length > 0 && (<optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Gen`}>{sg.generations.map(gen => (<option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>))}</optgroup>)))}
                                </select>
                            </div>
                            <div className='mb-2 flex gap-2'>
                                <button onClick={selectAllFiltered} className='flex-1 text-xs p-1 bg-blue-100 dark:bg-blue-900 rounded'>Select Filtered</button>
                                <button onClick={deselectAllFiltered} className='flex-1 text-xs p-1 bg-gray-200 dark:bg-gray-700 rounded'>Deselect Filtered</button>
                            </div>
                            <div className="space-y-1 max-h-60 overflow-y-auto border-t border-b dark:border-gray-700 p-1">
                                {filteredMembers.map(member => (
                                    <div key={member.rosterId} className={`flex items-center justify-between p-2 rounded ${selectedMembers.includes(member.id) ? 'bg-blue-200 dark:bg-blue-800' : 'bg-white dark:bg-gray-800/50'}`}>
                                        <div>
                                            <p className="font-semibold text-sm">{member.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">Vo: {member.singing} Da: {member.dancing} Fans: {getTotalFansForMember(member).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => toggleMember(member.id)} className={`px-3 py-1 text-xs rounded font-semibold ${selectedMembers.includes(member.id) ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>{selectedMembers.includes(member.id) ? 'Remove' : 'Add'}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border p-2 rounded-lg bg-gray-50 dark:bg-gray-900">
                            <h4 className="font-semibold mb-2 dark:text-gray-100">Announcements</h4>
                            <div className='grid grid-cols-2 gap-4'>
                                <div><label className="block text-sm font-medium dark:text-gray-300">Kage-ana</label><select value={kageAna} onChange={e => setKageAna(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"><option key="ana-none" value="">None</option>{selectedMembers.map(id => { const m = getMemberById(id); return m && <option key={id} value={id}>{m.name}</option>})}</select></div>
                                <div><label className="block text-sm font-medium dark:text-gray-300">Shime-ana</label><select value={shimeAna} onChange={e => setShimeAna(e.target.value)} className="w-full p-2 border rounded bg-white dark:bg-gray-800 dark:text-gray-200"><option key="ana-none" value="">None</option>{selectedMembers.map(id => { const m = getMemberById(id); return m && <option key={id} value={id}>{m.name}</option>})}</select></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setShowModal(null)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">Cancel</button>
                    <button onClick={handleConfirm} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400" disabled={!selectedVenue || selectedMembers.length < 5 || setlist.filter(i=>i.type==='song').length < 1}>Book Concert</button>
                </div>
            </div>
        </div>
    );
};

    const TheaterSelectionModal = () => {
        const { selection } = modalData; // selection can be teamId, 'sg-ID', or null

        const [venueOwnerId, setVenueOwnerId] = useState('');
        const [theme, setTheme] = useState('classic');
        const themes = ['classic', 'vocal', 'dance', 'idol', 'energy', 'theatrical', 'cool'];

        // --- Determine roster for cost calculation ---
        const getRosterForCosting = () => {
            const fullRoster = getMainGroupRoster();

            if (typeof selection === 'number') { // Team selected
                const team = teams.find(t => t.id === selection);
                if (!team) return [];
                return fullRoster.filter(m => team.members.includes(String(m.id)) && m.isAvailable);
            }

            if (typeof selection === 'string' && selection.startsWith('sg-')) { // Sister Group selected
                const sgId = selection.replace('sg-', '');
                return fullRoster.filter(m => String(m.groupId) === sgId && m.isAvailable);
            }

            // "All Available Members" selected
            return fullRoster.filter(m => m.isAvailable);
        };
        
        const roster = getRosterForCosting();
        const venue = theaters.find(t => t.owner === venueOwnerId);
        
        let travelCost = 0;
        if (venue) {
            // New Per-Member Travel Cost Logic
            roster.forEach(member => {
                const memberHomeGroupId = member.isSisterMember ? member.groupId : 'main';
                if (String(memberHomeGroupId) !== String(venue.owner)) {
                    travelCost += 2500; // Cost for this member to travel to a venue not owned by their group
                }
            });
        }

        const handleConfirm = () => {
            if (!venueOwnerId) return setMessage("You must select a theater to perform in.");
            
            holdTheaterShow({
                selection: selection, // Pass the original selection
                venueOwnerId: venueOwnerId,
                concertTheme: theme,
                travelCost: travelCost
            });
        };

        const performingEntityName = () => {
            if (typeof selection === 'number') {
                const team = teams.find(t => t.id === selection);
                const ownerName = team.groupId === 'main' ? groupName : (sisterGroups.find(sg => String(sg.id) === String(team.groupId))?.name || '');
                return `${team.name} (${ownerName})`;
            };
            if (typeof selection === 'string' && selection.startsWith('sg-')) return `${sisterGroups.find(g => String(g.id) === selection.replace('sg-',''))?.name} (Group)`;
            return "All Available Members";
        }

        return (
            <ModalWrapper title={`Plan Show for: ${performingEntityName()}`} maxWidth="max-w-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select a venue for the performance. Costs are incurred when members travel to theaters not owned by their home group.</p>

                <h4 className="font-semibold mb-1 dark:text-gray-200">1. Select Venue</h4>
                <select value={venueOwnerId} onChange={(e) => setVenueOwnerId(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600">
                    <option value="">-- Choose a Theater --</option>
                    {theaters.map(t => {
                        const owner = t.owner === 'main' ? groupName : sisterGroups.find(sg => sg.id === t.owner)?.name;
                        return <option key={t.owner} value={t.owner}>{t.name} ({owner})</option>
                    })}
                </select>

                <h4 className="font-semibold mb-1 mt-3 dark:text-gray-200">2. Select Performance Theme</h4>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600">
                    {themes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Matching the theme to the setlist's theme (if applicable) provides a performance bonus.</p>
                
                <div className="p-3 bg-yellow-50 dark:bg-gray-900 rounded-lg border border-yellow-200 dark:border-gray-700">
                    <p className="font-bold text-red-600 dark:text-yellow-300">Estimated Travel Cost: ¥{travelCost.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Cost is ¥2,500 per member traveling to a theater not owned by their home group.</p>
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-600">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                    <button onClick={handleConfirm} disabled={!venueOwnerId} className="p-2 bg-green-500 text-white rounded px-4 font-bold disabled:bg-gray-400">
                        Start Show
                    </button>
                </div>
            </ModalWrapper>
        )
    };


    const TheaterShowPrepModal = () => {
        const [theme, setTheme] = useState('classic');
        const themes = ['classic', 'vocal', 'dance', 'idol', 'energy', 'theatrical', 'cool'];

        const team = teams.find(t => t.id === selectedTheaterTeam);
        const setlist = team ? allSetlists.find(s => s.id === team.currentSetlistId) : null;

        // Automatically select the setlist's theme as default if available
        useEffect(() => {
            if (setlist && setlist.theme) {
                setTheme(setlist.theme);
            }
        }, [setlist]);

        return (
            <ModalWrapper title="Theater Show Preparation">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Prepare for the upcoming theater show.</p>
                
                {team && setlist ? (
                    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <p><strong>Team:</strong> <span className="font-semibold">{team.name}</span></p>
                        <p><strong>Setlist:</strong> <span className="font-semibold">{setlist.name}</span></p>
                        <p><strong>Recommended Theme:</strong> <span className="font-bold text-blue-600 dark:text-blue-400">{setlist.theme}</span></p>
                    </div>
                ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Performing with all available members.</p>
                )}

                <h4 className="font-semibold mb-1 dark:text-gray-200">Select Performance Theme</h4>
                <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700 dark:border-gray-600">
                    {themes.map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Matching the theme to the setlist's theme will provide a performance bonus.</p>
                
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t dark:border-gray-600">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                    <button onClick={() => holdTheaterShow({ teamId: selectedTheaterTeam, concertTheme: theme })} className="p-2 bg-green-500 text-white rounded px-4 font-bold">
                        Start Show
                    </button>
                </div>
            </ModalWrapper>
        );
    };
    const PerformanceResultModal = () => {
        const crowdRef = useRef(null);
        const containerRef = useRef(null); // For particles

        useEffect(() => {
            if (!modalData) return;

            // Particle effect logic
            const container = containerRef.current;
            if (!container) return;

            const createParticle = (emoji) => {
                const particle = document.createElement('div');
                particle.innerHTML = emoji;
                particle.className = 'particle-float';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
                particle.style.animationDuration = `${Math.random() * 3 + 2.5}s`;
                particle.style.opacity = Math.random() * 0.7 + 0.3;
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 5500);
            };

            const particleInterval = setInterval(() => {
                createParticle(Math.random() > 0.3 ? '✨' : '💖');
            }, 150);

            // Penlight logic
            const COLORS = ['#FFC0CB', '#FFB6C1', '#FFDDDE', '#F8C8DC', '#E0BBE4', '#FFFFFF'];
            const rand = (min, max) => Math.random() * (max - min) + min;

            const buildPenlights = (count = 22) => {
                const crowd = crowdRef.current;
                if (!crowd) return;
                while (crowd.firstChild) crowd.removeChild(crowd.firstChild);
                
                const w = crowd.clientWidth;
                for (let i = 0; i < count; i++) {
                    const pl = document.createElement('div');
                    pl.className = 'penlight';
                    pl.style.setProperty('--c', COLORS[Math.floor(Math.random() * COLORS.length)]);
                    pl.style.left = `${(i / (count - 1)) * (w - 40) + rand(-10, 10) + 20}px`;
                    pl.style.height = `${rand(70, 115)}px`;
                    pl.style.animationDelay = `${rand(-1.2, 0.6)}s`;
                    pl.style.animationDuration = `${rand(1.3, 2.4)}s`;
                    
                    const glow = document.createElement('div');
                    glow.className = 'glow';
                    const handle = document.createElement('div');
                    handle.className = 'handle';

                    pl.appendChild(glow);
                    pl.appendChild(handle);
                    crowd.appendChild(pl);
                }
                const sil = document.createElement('div');
                sil.className = 'sil';
                crowd.appendChild(sil);
            };

            buildPenlights(24);
            const handleResize = () => buildPenlights(24);
            window.addEventListener('resize', handleResize);

            return () => {
                clearInterval(particleInterval);
                window.removeEventListener('resize', handleResize);
            };
        }, [modalData]);

        if (!modalData) return null;

        // --- FINAL: All new event messages are available ---
        const { title, revenue, fansGained, performanceStats, totalMerchRevenue, bestSellerName, isBirthdayStage, isShonichi, isSenshuuraku, malfunctionMessage, legendaryPerformanceMessage } = modalData;

        const StatDisplay = ({ icon, label, value, valueColor }) => (
            <div className="flex justify-between items-center bg-white/20 p-3 rounded-lg backdrop-blur-sm border border-white/30">
                <span className="font-semibold flex items-center text-sm text-pink-800/80"><span className="mr-2 text-lg">{icon}</span>{label}:</span>
                <span className={`font-bold text-lg ${valueColor}`}>{value}</span>
            </div>
        );

        return (
            <div ref={containerRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in overflow-hidden">
                <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-br from-pink-200/80 to-pink-300/70 backdrop-blur-xl border-2 border-white/70 shadow-2xl p-6 text-center text-pink-900 animate-in fade-in slide-in-from-bottom-5">
                    
                    <div className="absolute top-4 right-4 text-4xl animate-bounce text-rose-400">
                        {isBirthdayStage ? '🎂' : '🎤'}
                    </div>

                    <h3 className="text-3xl font-serif font-bold text-pink-800 mb-2" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.5)' }}>
                        {title}
                    </h3>
                    
                    {/* --- THIS IS THE NEW UI SECTION FOR SHONICHI/SENSHUURAKU --- */}
                    {isShonichi && (
                        <p className="font-bold text-lg text-blue-600 mb-4 animate-pulse" style={{ textShadow: '1px 1px 4px rgba(255, 255, 255, 0.8)' }}>
                           A nervous but exciting first day! (+1 Reputation)
                        </p>
                    )}
                    {isSenshuuraku && (
                        <p className="font-bold text-lg text-purple-600 mb-4 animate-pulse" style={{ textShadow: '1px 1px 4px rgba(255, 255, 255, 0.8)' }}>
                           An emotional final performance! (Morale and Hardcore fans increased)
                        </p>
                    )}

                    {isBirthdayStage && (
                         <p className="font-bold text-lg text-rose-500 mb-4 animate-pulse" style={{ textShadow: '1px 1px 4px rgba(255, 255, 255, 0.8)' }}>
                           A Special Birthday Celebration!
                         </p>
                    )}
                    
                    {legendaryPerformanceMessage && (
                        <div className="my-4 p-3 rounded-lg border-2 border-yellow-300 bg-gradient-to-r from-yellow-100/50 to-amber-100/50 text-sm font-semibold text-amber-800 flex items-center justify-center gap-2 shadow-inner">
                            <Trophy size={18} />
                            {legendaryPerformanceMessage}
                        </div>
                    )}

                    {malfunctionMessage && (
                        <div className={`my-4 p-3 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 ${malfunctionMessage.includes('charmed') ? 'bg-green-100/50 border-green-400/50 text-green-800' : 'bg-red-100/50 border-red-400/50 text-red-800'}`}>
                            <AlertTriangle size={18} />
                            {malfunctionMessage}
                        </div>
                    )}

                    <div className="space-y-3 my-4">
                        <StatDisplay icon="💰" label="Total Revenue" value={`¥${revenue.toLocaleString()}`} valueColor="text-green-700" />
                        <StatDisplay icon="👥" label="New Fans" value={`+${fansGained.toLocaleString()}`} valueColor="text-blue-600" />
                    </div>

                    {performanceStats && (
                        <div className="p-3 mt-4 rounded-lg bg-white/20 text-xs backdrop-blur-sm border border-white/30">
                            <h4 className="font-bold text-center text-pink-900/80 mb-2">Performance Breakdown</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
                                <div><p className="font-bold text-blue-600 text-lg">{performanceStats.singing.toFixed(1)}</p><p className="text-pink-900/70">Avg. Vocal</p></div>
                                <div><p className="font-bold text-green-600 text-lg">{performanceStats.dancing.toFixed(1)}</p><p className="text-pink-900/70">Avg. Dance</p></div>
                                <div><p className="font-bold text-cyan-500 text-lg">{performanceStats.visual.toFixed(1)}</p><p className="text-pink-900/70">Avg. Visual</p></div>
                                <div><p className="font-bold text-rose-500 text-lg">{performanceStats.charisma.toFixed(1)}</p><p className="text-pink-900/70">Avg. Charisma</p></div>
                            </div>
                        </div>
                    )}
                    {totalMerchRevenue > 0 && (
                        <div className="p-3 mt-2 rounded-lg bg-white/20 text-xs backdrop-blur-sm border border-white/30">
                            <h4 className="font-bold text-center text-pink-900/80 mb-2">Merchandise Report</h4>
                            <div className="grid grid-cols-2 gap-2 text-center">
                                <div><p className="font-bold text-green-600 text-lg">¥{totalMerchRevenue.toLocaleString()}</p><p className="text-pink-900/70">Merch Revenue</p></div>
                                <div><p className="font-bold text-yellow-600 text-lg truncate" title={bestSellerName}>{bestSellerName}</p><p className="text-pink-900/70">Best Seller</p></div>
                            </div>
                        </div>
                    )}
                    
                    <div ref={crowdRef} className="crowd h-40 rounded-lg relative overflow-hidden bg-black/10 border border-white/20 shadow-inner my-6"></div>

                    <div className="flex justify-center mt-6">
                        <button onClick={() => setShowModal(null)} className="bg-gradient-to-br from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 active:scale-95 text-white px-12 py-3 rounded-full font-bold shadow-lg shadow-pink-500/30 transition-all text-lg border-2 border-white/80">
                            SUGOI!
                        </button>
                    </div>
                </div>
                
                <style jsx>{`
                    .particle-float { position: absolute; top: 100%; pointer-events: none; animation: floatUpAndFade 5s linear forwards; font-size: 1.5rem; }
                    @keyframes floatUpAndFade { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-80vh) rotate(720deg); opacity: 0; } }
                    .penlight { position: absolute; bottom: 12px; width: 8px; transform-origin: bottom center; animation: wave 1.9s ease-in-out infinite; }
                    .penlight .handle { position:absolute; bottom:0; left:50%; transform: translateX(-50%); width: 8px; height: 32px; border-radius: 4px; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.14); box-shadow: 0 6px 16px rgba(0,0,0,.35); }
                    .penlight .glow { position:absolute; bottom: 28px; left:50%; transform: translateX(-50%); width: 10px; height: 46px; border-radius: 999px; box-shadow: 0 0 18px var(--c), 0 0 32px color-mix(in srgb, var(--c), transparent 35%), 0 0 60px color-mix(in srgb, var(--c), transparent 55%); background: linear-gradient(180deg, color-mix(in srgb, var(--c), white 22%), var(--c)); border: 1px solid color-mix(in srgb, var(--c), white 25%); }
                    .crowd::before { content:""; position:absolute; inset:-40px; background: radial-gradient(220px 160px at 15% 30%, rgba(255,192,203,.4), transparent 60%), radial-gradient(240px 160px at 80% 25%, rgba(255,182,193,.3), transparent 62%), radial-gradient(300px 200px at 60% 65%, rgba(255,105,180,.25), transparent 65%); filter: blur(10px); opacity: .9; }
                    .sil { position:absolute; bottom:0; left:0; right:0; height: 40px; background: linear-gradient(180deg, transparent, rgba(0,0,0,.85)); }
                    @keyframes wave { 0% { transform: rotate(-8deg) translateY(0); } 50% { transform: rotate(10deg) translateY(-6px); } 100% { transform: rotate(-8deg) translateY(0); } }
                `}</style>
            </div>
        );
    };

    const ConfirmModal = () => {
        if (!modalData) return null;
        const { title, message, onConfirm, onCancel } = modalData;

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>
                    <div className="flex justify-center gap-4">
                        <button onClick={onCancel || (() => setShowModal(null))} className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold">Cancel</button>
                        <button onClick={onConfirm} className="px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold">Confirm</button>
                    </div>
                </div>
            </div>
        );
    };

    const ShuffleModeSelectionModal = () => {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Choose Shuffle Mode</h3>
                    <p className="text-gray-600 mb-6">How do you want to conduct this shuffle?</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-bold text-lg">Automatic Shuffle</h4>
                            <p className="text-sm text-gray-500 my-2">The fates will decide. Captains and Aces have a high chance to stay, but everyone else is fair game. Quick and chaotic.</p>
                            <button onClick={() => executeShuffle('auto')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-2">
                                Automatic
                            </button>
                        </div>
                        <div className="border p-4 rounded-lg">
                            <h4 className="font-bold text-lg">Manual Shuffle</h4>
                            <p className="text-sm text-gray-500 my-2">You are in full control. Drag and drop members to their new teams. Strategic, but time-consuming.</p>
                            <button onClick={() => setShowModal('manualShuffle')} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-2">
                                Manual
                            </button>
                        </div>
                    </div>
                     <button onClick={() => setShowModal(null)} className="mt-6 text-gray-500 hover:text-gray-700">Cancel Shuffle</button>
                </div>
            </div>
        );
    };

const ShuffleResultModal = () => {
    if (!modalData || !modalData.result) return null;
    const { result } = modalData;

    // This helper function is still used for Kennin members.
    const groupByCategory = (members, categoryKey) => {
        return members.reduce((acc, item) => {
            const key = item[categoryKey];
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.memberName);
            return acc;
        }, {});
    };

    return (
        <ModalWrapper title="Grand Shuffle Results" maxWidth="max-w-4xl">
            <div className="space-y-6 max-h-[75vh] overflow-y-auto p-2">
                {Object.values(result).map((teamData) => {
                    const kenninFromGroups = groupByCategory(teamData.kenninIn, 'fromGroup');

                    // Group shuffled-in members by their "from" location.
                    const groupedShuffledIn = teamData.shuffledIn.reduce((acc, move) => {
                        const key = move.fromTeam;
                        if (!acc[key]) acc[key] = [];
                        acc[key].push(move); // Push the whole move object
                        return acc;
                    }, {});

                    const hasContent = teamData.retained.length > 0 || teamData.shuffledIn.length > 0 || teamData.transferredIn.length > 0 || teamData.kenninIn.length > 0;
                    if (!hasContent) return null;

                    return (
                        <div key={teamData.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-pink-500">{teamData.groupName}</h3>
                            <h4 className="text-xl font-semibold mb-3 border-b pb-2 dark:border-gray-600">{teamData.name}</h4>

                            {teamData.retained.length > 0 && (
                                <div className="mb-3">
                                    <p className="font-bold text-sm text-gray-700 dark:text-gray-200">Original Members</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{teamData.retained.map(m => m.memberName).join(', ')}</p>
                                </div>
                            )}

                            {/* --- NEW LOGIC TO RENDER GROUPS WITH COLORS --- */}
                            {Object.entries(groupedShuffledIn).map(([fromTeam, moves]) => {
                                // All moves in this group have the same type, so we just check the first one.
                                const moveType = moves[0]?.moveType;

                                const getColorForMove = () => {
                                    switch (moveType) {
                                        case 'transfer':
                                            return 'text-purple-600 dark:text-purple-400';
                                        case 'promotion':
                                            return 'text-red-600 dark:text-red-400';
                                        default: // 'shuffle'
                                            return 'text-blue-600 dark:text-blue-400';
                                    }
                                };
                                
                                const color = getColorForMove();
                                const memberNames = moves.map(m => m.memberName).join(', ');

                                return (
                                    <div key={fromTeam} className="mb-3">
                                        <p className={`font-bold text-sm ${color}`}>From {fromTeam}</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{memberNames}</p>
                                    </div>
                                );
                            })}
                            {/* --- END NEW LOGIC --- */}

                            {Object.entries(kenninFromGroups).map(([fromGroup, members]) => (
                                <div key={fromGroup} className="mb-3">
                                    <p className="font-bold text-sm text-yellow-600 dark:text-yellow-400">Concurrent Position from {fromGroup}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{members.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={() => setShowModal(null)} className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600">Close</button>
            </div>
        </ModalWrapper>
    );
};

    const ManualShuffleModal = () => {
        const [unassigned, setUnassigned] = useState([]);
        const [teamBuckets, setTeamBuckets] = useState({});
        const [lockedMembers, setLockedMembers] = useState([]);

        useEffect(() => {
            const allTeamMembers = getMainGroupRoster().filter(m => m.teamId);
            const initialBuckets = teams.reduce((acc, team) => ({ ...acc, [team.id]: [] }), {});
            const membersToLock = [];
            const captainIds = Object.values(groupRoles);

            allTeamMembers.forEach(member => {
                const memberId = member.rosterId || member.id;
                if (captainIds.includes(memberId)) {
                    membersToLock.push(member);
                    if (initialBuckets[member.teamId]) {
                       initialBuckets[member.teamId].push(member);
                    }
                }
            });
            
            const lockedIds = membersToLock.map(m => m.rosterId || m.id);
            setLockedMembers(lockedIds);

            const remainingMembers = allTeamMembers.filter(m => !lockedIds.includes(m.rosterId || m.id));
            setUnassigned(remainingMembers);
            setTeamBuckets(initialBuckets);
        }, []);

        const handleAssignMember = (member, teamIdStr) => {
            const teamId = parseInt(teamIdStr);
            if (!teamId) return;

            const team = teams.find(t => t.id === teamId);
            if (teamBuckets[teamId].length >= team.members.length) {
                alert(`Team ${team.name} is already at its capacity of ${team.members.length}.`);
                return;
            }
            setUnassigned(prev => prev.filter(m => (m.rosterId || m.id) !== (member.rosterId || member.id)));
            setTeamBuckets(prev => ({
                ...prev,
                [teamId]: [...prev[teamId], member]
            }));
        };

        const handleUnassignMember = (member, fromTeamId) => {
            if (lockedMembers.includes(member.rosterId || member.id)) return; // Prevent unassigning locked members
            setTeamBuckets(prev => ({
                ...prev,
                [fromTeamId]: prev[fromTeamId].filter(m => (m.rosterId || m.id) !== (member.rosterId || member.id))
            }));
            setUnassigned(prev => [member, ...prev]);
        };
        
        const handleLockMember = (member) => {
            const teamId = member.teamId;
            const team = teams.find(t => t.id === teamId);
            if (teamBuckets[teamId].length >= team.members.length) {
                alert(`Cannot lock ${member.name}: Team ${team.name} is full.`);
                return;
            }
            const memberId = member.rosterId || member.id;
            setLockedMembers(prev => [...prev, memberId]);
            setUnassigned(prev => prev.filter(m => (m.rosterId || m.id) !== memberId));
            setTeamBuckets(prev => ({
                ...prev,
                [teamId]: [...prev[teamId], member]
            }));
        };

        const handleConfirmShuffle = () => {
            if (unassigned.length > 0) {
                alert("You must assign all members to a team before confirming the shuffle.");
                return;
            }
            const finalAssignments = {};
            Object.keys(teamBuckets).forEach(teamId => {
                teamBuckets[teamId].forEach(member => {
                    finalAssignments[member.rosterId || member.id] = parseInt(teamId);
                });
            });
            executeShuffle('manual', finalAssignments);
        };

        return (
            <ModalWrapper title="Manual Shuffle" maxWidth="max-w-2xl">
                <div className="flex flex-col h-[85vh]">
                    {/* Scrollable content area */}
                    <div className="flex-grow overflow-y-auto space-y-6 pr-2 -mr-2">

                        {/* Unassigned Members Pool */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border dark:border-gray-700">
                            <h4 className="font-bold text-lg mb-3">Member Pool ({unassigned.length})</h4>
                            {unassigned.length > 0 ? (
                                <div className="space-y-3">
                                    {unassigned.map(member => (
                                        <div key={member.rosterId || member.id} className="p-3 rounded bg-white dark:bg-gray-700/50 border dark:border-gray-600">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold">{member.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Original: {teams.find(t => t.id === member.teamId)?.name || 'N/A'}</p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleLockMember(member)} title="Lock member to their original team" className="text-gray-400 hover:text-blue-600 p-1">
                                                        <Lock size={16} />
                                                    </button>
                                                    <select
                                                        onChange={(e) => handleAssignMember(member, e.target.value)}
                                                        className="text-xs rounded border-gray-300 dark:bg-gray-600 dark:border-gray-500 shadow-sm"
                                                        value="" // Uncontrolled select, acts as action buttons
                                                    >
                                                        <option value="" disabled>Assign to...</option>
                                                        {teams.map(team => (
                                                            <option key={team.id} value={team.id} disabled={(teamBuckets[team.id]?.length || 0) >= team.members.length}>
                                                                {team.name} {(teamBuckets[team.id]?.length || 0) >= team.members.length ? '(Full)' : ''}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">All members have been assigned.</p>
                            )}
                        </div>

                        {/* Team Buckets */}
                        <div className="space-y-4">
                            <h4 className="font-bold text-lg">Teams</h4>
                            {teams.map(team => {
                                const teamGroupName = team.groupId === 'main' ? groupName : (sisterGroups.find(sg => String(sg.id) === String(team.groupId))?.name);
                                return (
                                    <div key={team.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
                                        <h5 className="font-bold mb-3 text-pink-500">
                                            {teamGroupName} - {team.name}
                                            <span className="ml-2 font-normal text-sm text-gray-500 dark:text-gray-400">({teamBuckets[team.id]?.length || 0} / {team.members.length})</span>
                                        </h5>
                                        <div className="space-y-2">
                                            {(teamBuckets[team.id] || []).length > 0 ? (
                                                (teamBuckets[team.id] || []).map(member => {
                                                    const memberId = member.rosterId || member.id;
                                                    const isLocked = lockedMembers.includes(memberId);
                                                    return (
                                                        <div key={memberId} className={`p-2 rounded text-sm flex justify-between items-center ${isLocked ? 'bg-blue-50 dark:bg-blue-900/30' : 'bg-green-50 dark:bg-green-900/30'}`}>
                                                            <span className="flex items-center">
                                                                {isLocked && <Lock size={14} className="mr-2 text-blue-500 flex-shrink-0" />}
                                                                {member.name}
                                                            </span>
                                                            {!isLocked && (
                                                                <button onClick={() => handleUnassignMember(member, team.id)} className="text-red-500 hover:text-red-700 font-bold text-xl leading-none px-2 rounded-full">
                                                                    &times;
                                                                </button>
                                                            )}
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                 <p className="text-xs text-gray-400 italic">No members assigned yet.</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 mt-auto border-t dark:border-gray-700 flex justify-end gap-4">
                         <button onClick={() => setShowModal('shuffleModeSelection')} className="px-6 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 font-semibold">
                            Back
                        </button>
                        <button onClick={handleConfirmShuffle} disabled={unassigned.length > 0} className={`px-6 py-2 rounded text-white font-semibold transition-colors ${unassigned.length > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}>
                            Confirm Shuffle
                        </button>
                    </div>
                </div>
            </ModalWrapper>
        );
    };

    const HandshakeSelectionModal = () => {
        if (!modalData || !modalData.eligibleSingle) return null;

        const { eligibleSingle } = modalData;
        const [selectedMemberIds, setSelectedMemberIds] = useState([]);
        const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable);

        const toggleMember = (memberId) => {
            setSelectedMemberIds(prev => 
                prev.includes(memberId) 
                    ? prev.filter(id => id !== memberId) 
                    : [...prev, memberId]
            );
        };

        const selectAll = () => setSelectedMemberIds(availableMembers.map(m => m.id));
        const deselectAll = () => setSelectedMemberIds([]);

        const handleConfirm = () => {
            executeHandshakeEvent(selectedMemberIds, eligibleSingle.id);
        };

        return (
            <ModalWrapper title={`Select Members for "${eligibleSingle.name}" Handshake`} maxWidth="max-w-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select members from your entire agency to participate. This event boosts fans but is very tiring.</p>
                <div className="flex gap-2 mb-2">
                    <button onClick={selectAll} className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded font-semibold hover:bg-blue-200">Select All</button>
                    <button onClick={deselectAll} className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300">Deselect All</button>
                </div>
                <div className="space-y-1 max-h-[400px] overflow-y-auto border-t border-b dark:border-gray-700 p-1 mb-4">
                    {availableMembers.map(member => (
                        <div key={member.rosterId} className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedMemberIds.includes(member.id) ? 'bg-blue-100 dark:bg-blue-800' : 'bg-white dark:bg-gray-700/50 hover:bg-gray-50'}`} onClick={() => toggleMember(member.id)}>
                            <div>
                                <p className="font-semibold text-sm">{member.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Fans: {getTotalFansForMember(member).toLocaleString()}</p>
                            </div>
                            <input type="checkbox" checked={selectedMemberIds.includes(member.id)} readOnly className="form-checkbox h-4 w-4 text-blue-600"/>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                    <button onClick={handleConfirm} disabled={selectedMemberIds.length === 0} className="p-3 bg-green-500 text-white rounded font-bold disabled:bg-gray-400">
                        Confirm Event ({selectedMemberIds.length} members)
                    </button>
                </div>
            </ModalWrapper>
        );
    };

    const HandshakeEventResultModal = () => {
        if (!modalData) return null;
        const { convertedFans, newFans, members } = modalData;
        const containerRef = useRef(null);

        // A simple, reusable chibi character component for the modal
        const Chibi = ({ index }) => {
            return (
                <div className="relative flex flex-col items-center chibi-bounce" style={{ animationDelay: `${index * 0.15}s` }}>
                    <div className="relative w-20 h-28">
                        {/* Hair */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-[#ff99c8]"></div>
                        {/* Face */}
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-[#ffdab9]"></div>
                        {/* Hair highlight */}
                        <div className="absolute top-2 left-8 w-6 h-4 rounded-full bg-white/60" style={{transform: 'rotate(-30deg)'}}></div>
                        {/* Dress */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-pink-300 rounded-t-lg"></div>
                    </div>
                </div>
            );
        };

        // This effect creates the floating hearts and sparkles
        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const createParticle = (emoji, className) => {
                const particle = document.createElement('div');
                particle.innerHTML = emoji;
                particle.className = `absolute bottom-0 pointer-events-none text-2xl ${className}`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.animationDuration = `${Math.random() * 2 + 3}s`;
                particle.style.opacity = `${Math.random()}`;
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            };
            
            const heartInterval = setInterval(() => createParticle('❤️', 'heart-float'), 300);
            const sparkleInterval = setInterval(() => createParticle('✨', 'sparkle-float'), 450);

            return () => {
                clearInterval(heartInterval);
                clearInterval(sparkleInterval);
            };
        }, []);

        return (
            <div ref={containerRef} className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in overflow-hidden">
                <div className="w-full max-w-xl rounded-3xl bg-gradient-to-br from-pink-300/80 to-purple-300/60 border-2 border-white/50 shadow-2xl p-6 text-center text-white relative animate-in fade-in slide-in-from-bottom-5">
                    
                    <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-2" style={{ fontFamily: 'Mochiy Pop One, sans-serif', textShadow: '2px 2px 8px rgba(236, 72, 153, 0.8)'}}>
                        HANDSHAKE SUCCESS!
                    </h2>
                    <p className="text-white/80 mb-6">The fans absolutely loved the event!</p>
                    
                    <div className="flex justify-center items-end gap-4 my-6 h-32">
                        {(members || []).slice(0, 5).map((member, index) => (
                            <Chibi key={member.rosterId} index={index} />
                        ))}
                    </div>

                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl space-y-4 border border-white/20">
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-4xl drop-shadow-md">💖</div>
                            <p className="text-lg text-left">
                                Converted <span className="font-bold text-2xl text-red-300 drop-shadow-sm">{convertedFans.toLocaleString()}</span> fans to Hardcore!
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-4xl drop-shadow-md">✨</div>
                            <p className="text-lg text-left">
                                Gained <span className="font-bold text-2xl text-cyan-300 drop-shadow-sm">{newFans.toLocaleString()}</span> new Casual fans!
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button 
                            onClick={() => setShowModal(null)} 
                            className="bg-gradient-to-br from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 active:scale-95 text-white px-12 py-3 rounded-full font-bold shadow-xl transition-all text-lg border-2 border-white/50"
                        >
                            SUGOI!
                        </button>
                    </div>
                </div>
                <style jsx>{`
                    @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');
                    .chibi-bounce { animation: bounce 3s infinite ease-in-out; }
                    @keyframes bounce { 
                        0%, 100% { transform: translateY(0); } 
                        50% { transform: translateY(-12px); } 
                    }
                    .heart-float, .sparkle-float { 
                        animation-name: floatUp;
                        animation-timing-function: linear;
                        animation-fill-mode: forwards;
                    }
                    @keyframes floatUp { 
                        to { 
                            transform: translateY(-500px) rotate(360deg); 
                            opacity: 0; 
                        } 
                    }
                `}</style>
            </div>
        );
    };

    const SportsFestivalModal = () => {
    return (
        <ModalWrapper title="Hold Sports Festival" maxWidth="max-w-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Divide all available members into two teams, Red and White, for a day of athletic competitions.
                This is a great way to boost morale for the entire group.
            </p>
            <div className="p-3 bg-yellow-50 dark:bg-gray-900 rounded-lg border border-yellow-200 dark:border-gray-700 text-center mb-4">
                <p className="font-bold text-lg text-red-600 dark:text-yellow-300">Cost: ¥150,000</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Covers venue rental, equipment, and prizes.</p>
            </div>
            <div className="flex justify-end gap-2 mt-6 pt-4 border-t dark:border-gray-600">
                <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                <button
                    onClick={startSportsFestival}
                    disabled={money < 150000}
                    className="p-2 bg-red-500 text-white rounded px-4 font-bold disabled:bg-gray-400"
                >
                    Begin Festival
                </button>
            </div>
        </ModalWrapper>
    );
};

const SportsFestivalResultModal = () => {
    if (!modalData) return null;
    const { winningTeam, mvp, teamRed, teamWhite, events } = modalData;

    const TeamColumn = ({ teamName, members, colorClass, score }) => (
        <div className={`p-4 rounded-lg bg-opacity-20 ${colorClass}`}>
            <h3 className={`text-2xl font-bold mb-3 text-center`}>{teamName} Team - {score}pts</h3>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-2">
                {members.map(m => <p key={m.id} className="text-sm p-1 bg-black bg-opacity-10 rounded">{m.name}</p>)}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-4xl rounded-2xl bg-gray-800 bg-opacity-80 border border-gray-700 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-5">
                <div className="p-4 flex justify-between items-center bg-white bg-opacity-10 flex-shrink-0">
                     <h3 className="font-bold text-2xl text-white">Sports Festival Results</h3>
                    <button onClick={() => setShowModal(null)} className="w-9 h-9 rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center hover:bg-opacity-20 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-5 grid gap-4 overflow-y-auto text-white">
                    <div className="text-center my-4">
                        <h2 className="text-4xl font-bold">The <span className={winningTeam === 'Red' ? 'text-red-400' : 'text-blue-400'}>{winningTeam} Team</span> is Victorious!</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TeamColumn teamName="Red" members={teamRed.members} colorClass="bg-red-500" score={teamRed.score} />
                        <TeamColumn teamName="White" members={teamWhite.members} colorClass="bg-blue-500" score={teamWhite.score} />
                    </div>

                    <div className="mt-4 p-4 bg-black bg-opacity-30 rounded-xl text-center">
                        <h3 className="text-xl font-bold text-yellow-300">MVP</h3>
                        <p className="text-2xl font-semibold">{mvp.name}</p>
                        <p className="text-sm text-gray-300">For outstanding performance and spirit!</p>
                    </div>

                    <div className="mt-2">
                        <h3 className="font-bold text-lg mb-2 text-center">Event Highlights</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto p-2 border border-white/10 rounded-lg bg-black bg-opacity-20">
                            {events.map((event, index) => (
                                <div key={index} className="p-2 bg-white/5 rounded">
                                    <p className="font-semibold text-sm">{event.name}</p>
                                    <p className="text-xs text-gray-300">Winner: {event.winnerName} ({event.winningTeam} Team)</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end p-5 mt-auto border-t border-white/10 flex-shrink-0">
                    <button onClick={() => setShowModal(null)} className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
};

const LiveSportsFestivalModal = () => {
    if (!liveSportsFestival) return null;

    const { teamRed, teamWhite, events, currentEventIndex, eventLog } = liveSportsFestival;
    const isFinished = currentEventIndex >= events.length;

    const EventCard = ({ log, index }) => (
        <div className="p-3 bg-black/20 rounded-lg animate-in fade-in slide-in-from-bottom-5" style={{animationDelay: `${index * 100}ms`}}>
            <p className="font-bold text-lg">{log.name}</p>
            <p className="text-sm text-gray-300">{log.description}</p>
            <p className="text-sm font-semibold mt-1">Winner: {log.winnerName} (<span className={log.winningTeam === 'Red' ? 'text-red-300' : 'text-blue-300'}>{log.winningTeam} Team</span>)</p>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-6xl rounded-2xl bg-gray-800 bg-opacity-80 border border-gray-700 shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in slide-in-from-bottom-5">
                
                {/* Header */}
                <div className="p-4 flex justify-between items-center bg-white/10 flex-shrink-0">
                    <h3 className="font-bold text-2xl text-white">Sports Festival - LIVE</h3>
                    <div className="flex items-center gap-4">
                        <div className="p-2 px-4 rounded-lg bg-red-500/80 text-white">
                            <span className="font-bold text-xl">RED: {teamRed.score}</span>
                        </div>
                        <div className="p-2 px-4 rounded-lg bg-blue-500/80 text-white">
                            <span className="font-bold text-xl">WHITE: {teamWhite.score}</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-5 grid md:grid-cols-3 gap-4 overflow-y-auto text-white">
                    {/* Team Red */}
                    <div className="md:col-span-1 p-4 rounded-lg bg-red-900/40">
                        <h3 className="text-xl font-bold mb-3 text-center text-red-200">RED TEAM</h3>
                        <div className="space-y-1 max-h-96 overflow-y-auto pr-2">
                            {teamRed.members.map(m => <p key={m.id} className="text-sm p-1 bg-black/20 rounded truncate">{m.name}</p>)}
                        </div>
                    </div>

                    {/* Event Log */}
                    <div className="md:col-span-1 p-4 rounded-lg bg-black/30">
                         <h3 className="text-xl font-bold mb-3 text-center text-gray-200">EVENT LOG</h3>
                         <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                            {eventLog.length === 0 && <p className="text-center text-gray-400 italic mt-10">Events will appear here as they happen.</p>}
                            {eventLog.map((log, index) => <EventCard key={index} log={log} index={index} />)}
                         </div>
                    </div>
                    
                    {/* Team White */}
                    <div className="md:col-span-1 p-4 rounded-lg bg-blue-900/40">
                        <h3 className="text-xl font-bold mb-3 text-center text-blue-200">WHITE TEAM</h3>
                        <div className="space-y-1 max-h-96 overflow-y-auto pr-2">
                            {teamWhite.members.map(m => <p key={m.id} className="text-sm p-1 bg-black/20 rounded truncate">{m.name}</p>)}
                        </div>
                    </div>
                </div>

                {/* Footer / Actions */}
                <div className="flex justify-center p-5 mt-auto border-t border-white/10 flex-shrink-0">
                    {isFinished ? (
                         <button onClick={finishSportsFestival} className="px-10 py-4 bg-green-600 text-white rounded-lg font-bold text-xl hover:bg-green-700 transition-colors shadow-lg">
                            View Final Results
                        </button>
                    ) : (
                        <button onClick={simulateSportsFestivalEvent} className="px-10 py-4 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-700 transition-colors animate-pulse">
                            Simulate: {events[currentEventIndex].name}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};


    const GraduationTalkModal = () => {
        if (!modalData || !modalData.member) return null;
        const { member, speech } = modalData;

        // A simple chibi character component
        const Chibi = () => {
            const idolPink = '#ffc1d5';
            return (
                <div className="relative flex flex-col items-center chibi-bounce">
                    <div className="relative w-20 h-28">
                        {/* Hair */}
                        <div 
                            className="absolute top-5 -left-5 w-8 h-14 rounded-lg" 
                            style={{ backgroundColor: idolPink, transform: 'rotate(-20deg)' }}
                        ></div>
                        <div 
                            className="absolute top-5 -right-5 w-8 h-14 rounded-lg" 
                            style={{ backgroundColor: idolPink, transform: 'rotate(20deg)' }}
                        ></div>
                        {/* Head/Body */}
                        <div 
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-24 rounded-t-full"
                            style={{ backgroundColor: idolPink }}
                        ></div>
                    </div>
                </div>
            );
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-end justify-center z-50 p-4 animate-in fade-in">
                <div 
                    className="relative w-full max-w-xl mb-10"
                    // Add this onClick to allow closing by clicking outside the speech bubble
                    onClick={() => setShowModal(null)} 
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                        <Chibi />
                    </div>
                    <div 
                        className="speech-bubble bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border dark:border-gray-700 relative"
                        // Stop propagation so clicking the bubble doesn't close the modal
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <p className="text-lg italic text-gray-800 dark:text-gray-200">"{speech}"</p>
                        <p className="text-right font-bold text-gray-600 dark:text-gray-400 mt-2">- {member.name}</p>
                    </div>
                </div>
                <style jsx>{`
                    .chibi-bounce {
                        animation: bounce 3s infinite ease-in-out;
                    }
                    @keyframes bounce {
                        0%, 100% { transform: translateY(0) scale(1); }
                        50% { transform: translateY(-20px) scale(1.05); }
                    }
                    .speech-bubble {
                        animation: slide-up 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                        transform: translateY(100%);
                        opacity: 0;
                        margin-bottom: 120px; /* Make space for the chibi */
                    }
                    @keyframes slide-up {
                        to {
                            transform: translateY(0);
                            opacity: 1;
                        }
                    }
                `}</style>
            </div>
        );
    };

const ScandalDecisionModal = () => {
    if (!activeScandal) return null;
    const { member, scandal } = activeScandal;

    const scandalResponseOptions = {
        deny: { text: 'Deny Publicly', cost: 10000, description: 'Issue a strong denial. Risky, but could work.' },
        apologize: { text: 'Apologize', cost: 5000, description: 'Issue a formal apology. Admits guilt but shows sincerity.' },
        suspend: { text: 'Suspend Member (4 Weeks)', cost: 0, description: 'Suspend the member from all activities. Shows you are taking action.' },
        ignore: { text: 'Ignore', cost: 0, description: 'Do nothing and hope the story blows over. Unpredictable.' },
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-xl rounded-2xl bg-gray-800 bg-opacity-70 border border-gray-700 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
                {/* Header */}
                <div className="p-4 flex justify-between items-center bg-white bg-opacity-10">
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-bold uppercase tracking-wider bg-red-500 bg-opacity-80 text-white py-1 px-3 rounded-full">SCANDAL</span>
                        <h3 className="font-bold text-lg text-white">Scandal Erupted!</h3>
                    </div>
                    <button onClick={() => setShowModal(null)} className="w-9 h-9 rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center hover:bg-opacity-20 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 grid gap-4">
                    {/* Main scandal info */}
                    <div className="text-center text-white">
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-sm text-gray-300 mb-4">is embroiled in a scandal!</p>
                        <div className="p-4 bg-red-900 bg-opacity-40 border border-red-500/50 rounded-lg text-left">
                            <h4 className="font-bold text-red-300">{scandal.type}</h4>
                            <p className="text-sm italic mt-1 text-white-200">"{scandal.description}"</p>
                        </div>
                    </div>

                    {/* Response options */}
                    <div className="mt-4">
                        <h4 className="font-semibold text-center mb-3 text-gray-200">How will you respond?</h4>
                        <div className="space-y-3">
                            {Object.entries(scandalResponseOptions).map(([key, option]) => (
                                <button
                                    key={key}
                                    onClick={() => handleScandalResponse(key)}
                                    className="w-full text-left p-3 border border-white/10 rounded-lg hover:bg-white/10 bg-white/5 text-white transition-colors"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{option.text}</span>
                                        <span className="font-semibold text-yellow-400">¥{option.cost.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-300">{option.description}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ScandalResultModal = () => {
    if (!modalData) return null;

    const { member, scandal, action, resultMessage, fanLoss, moraleHit, reputationLoss, urgencyIncrease } = modalData;

    const getActionText = (actionKey) => {
        const options = {
            deny: 'Deny Publicly',
            apologize: 'Apologize',
            suspend: 'Suspend Member',
            ignore: 'Ignore'
        };
        return options[actionKey] || 'Unknown Action';
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-xl rounded-2xl bg-gradient-to-br from-gray-800 to-black border-2 border-red-500/50 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 text-white">
                <div className="p-4 flex justify-between items-center bg-red-900/50">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={24} className="text-red-400"/>
                        <h3 className="font-bold text-2xl text-white">Scandal Fallout</h3>
                    </div>
                </div>

                <div className="p-6">
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-sm text-gray-400">Scandal: {scandal.type}</p>
                    </div>

                    <div className="bg-black/30 p-4 rounded-lg">
                        <p className="text-sm">You chose to: <strong className="text-yellow-300">{getActionText(action)}</strong></p>
                        <p className="text-md italic mt-2">"{resultMessage}"</p>
                    </div>

                    <h4 className="font-bold text-center mt-6 mb-3">Consequences:</h4>
                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="p-3 bg-red-500/20 rounded-lg">
                            <p className="text-2xl font-bold text-red-300">-{fanLoss.toLocaleString()}</p>
                            <p className="text-xs font-semibold text-gray-300">Fans Lost</p>
                        </div>
                        <div className="p-3 bg-red-500/20 rounded-lg">
                            <p className="text-2xl font-bold text-red-300">-{moraleHit}</p>
                            <p className="text-xs font-semibold text-gray-300">Member Morale</p>
                        </div>
                        <div className="p-3 bg-yellow-500/20 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-300">{reputationLoss}</p>
                            <p className="text-xs font-semibold text-gray-300">Reputation</p>
                        </div>
                        <div className="p-3 bg-yellow-500/20 rounded-lg">
                            <p className="text-2xl font-bold text-yellow-300">+{urgencyIncrease.toFixed(0)}</p>
                            <p className="text-xs font-semibold text-gray-300">Graduation Urgency</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-black/20 mt-4">
                    <button onClick={() => setShowModal(null)} className="w-full p-3 bg-red-600 text-white rounded-lg font-bold text-base hover:bg-red-700 transition-colors">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

const SaveGameModal = () => {
        const [saveUsername, setSaveUsername] = useState(username);

        const handleSave = () => {
            if (saveUsername.trim()) {
                saveGame(saveUsername.trim());
            } else {
                setMessage("Please enter a valid username to save.");
            }
        };

        return (
            <ModalWrapper title={<span className="flex items-center"><Save size={20} className="mr-2"/> Save Game</span>}>
                <p className="text-sm text-gray-600 mb-4">Save your current game state to Firestore using a unique username.</p>
                <h4 className="font-semibold mb-1">Save Username (Case Sensitive)</h4>
                <input 
                    type="text" 
                    value={saveUsername} 
                    onChange={(e) => setSaveUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter your unique save username"
                />
                
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleSave} disabled={!saveUsername.trim()} className="p-2 bg-blue-500 text-white rounded disabled:bg-gray-400">
                        Confirm Save
                    </button>
                </div>
            </ModalWrapper>
        );
    };

    const LoadGameModal = () => {
        const [loadUsername, setLoadUsername] = useState('');

        const handleLoad = () => {
            if (loadUsername.trim()) {
                loadGame(loadUsername.trim());
            } else {
                setMessage("Please enter the username of the save file to load.");
            }
        };

        return (
            <ModalWrapper title={<span className="flex items-center"><Upload size={20} className="mr-2"/> Load Game</span>}>
                <p className="text-sm text-gray-600 mb-4">Load a previously saved game using the username associated with it.</p>
                <h4 className="font-semibold mb-1">Load Username (Case Sensitive)</h4>
                <input 
                    type="text" 
                    value={loadUsername} 
                    onChange={(e) => setLoadUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    placeholder="Enter the save username"
                />
                
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleLoad} disabled={!loadUsername.trim()} className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400">
                        Confirm Load
                    </button>
                </div>
            </ModalWrapper>
        );
    };

        const GraduationAnnouncementModal = () => {
            const member = modalData;
            if (!member) return null;
    
            const reasons = {
                'Pursue a Solo Dream': [
                    "I've spent a long time thinking about my future, and I’ve decided I want to challenge myself as an actress. To take that next step, I will be graduating.",
                    "While performing on stage has been a joy, I’ve discovered a deep passion for songwriting. I want to see if my own voice can stand alone as a solo artist.",
                    "My dream since childhood was to be on the silver screen. I've learned everything I can here, and now I must dive headfirst into the world of acting.",
                    "I want to explore the world of fashion and design. To build my own brand and see my visions come to life, I need to dedicate all my time to this new path.",
                    "Performing as an idol has given me confidence, but now I want to study musical theater seriously and stand on a different kind of stage."
                ],
                'Reaching the Goal': [
                    "When I joined, I promised myself I would stay until we reached this stage. Now that we've done it together, I feel I can leave with no regrets.",
                    "Performing at the Nippon Budokan was our ultimate dream. Now that the lights have dimmed on that performance, I feel my mission here is complete.",
                    "We finally hit #1 on the charts. I’ve seen this group reach the summit, and I want to leave while my heart is full of this specific happiness.",
                    "I promised to stay until our 10th anniversary. We made it. I’m so proud of what we built, and I can now smile as I say goodbye.",
                    "Looking at the sea of light sticks tonight, I know we’ve succeeded in becoming a household name. I’m ready for what's next."
                ],
                'Prove My Worth': [
                    "I joined this group to show everyone what I could do. I've given it my all, but I feel like my journey here has reached its limit. I'm going to find a new place where I can shine.",
                    "I’ve spent years in the back row. While I love my teammates, I have a hunger to be center. I’m graduating to find a stage where I am the protagonist.",
                    "I want to test my skills in a more competitive environment overseas. I don't want to wonder 'what if' for the rest of my life.",
                    "I have poured my soul into every dance. If I stay here, I fear I’ll become complacent. I need a new, harder challenge to keep growing.",
                    "I’ve realized that my vision for my artistry no longer aligns with the group's direction. To stay true to my creative spark, I must walk alone."
                ],
                'Find Normal Happiness': [
                    "Being an idol has been a dream come true, but I’ve realized I want to experience life as a normal girl again, away from the bright lights.",
                    "I want to walk down the street without a mask, go to a cafe with friends, and enjoy the simple things I’ve missed since I was a teenager.",
                    "I’ve given my youth to the fans, and I don’t regret a second. But now, I want to find a different kind of love and build a quiet, ordinary life.",
                    "The 'Idol' version of me is just one part of who I am. I want to rediscover the 'me' that existed before the makeup and the costumes.",
                    "I’ve decided to retire from the industry entirely. I want my next chapter to be private, peaceful, and entirely my own."
                ],
                'Space for Juniors': [
                    "Seeing how much the younger members have grown lately makes me so happy. I feel like I can finally entrust the future of the group to them.",
                    "I’ve been the pillar of this group for a long time. It’s time for me to step aside so a new ace can emerge and lead us into the next era.",
                    "The juniors are ready. If I stay, I’m taking up a spot that belongs to the future. I want to watch them thrive from the audience.",
                    "I’ve taught them everything I know. Now, the greatest gift I can give the group is the room to grow without my shadow hanging over them.",
                    "My role as a mentor is finished. Seeing their glittering eyes makes me realize the group is in safe hands. It’s my time to fly."
                ],
                'Academic Focus': [
                    "I've tried my best to balance school and my activities here, but I’ve reached a point where I need to focus 100% on my exams and my future education.",
                    "I’ve been accepted into a university abroad. This is a once-in-a-lifetime opportunity to study the subjects I love, and I have to take it.",
                    "My dream of becoming a doctor requires all my focus now. I want to save people in a different way than I did as an idol.",
                    "Entering my final year of school has made me realize how much I’ve fallen behind. I need to catch up to ensure my future outside of the stage.",
                    "I want to study art and history. To truly immerse myself in my studies, I’ve decided to put down the microphone and pick up the books."
                ],
                'The Rival': [
                    "To my greatest rival... thank you. You pushed me to be better every single day. But I've found a new mountain to climb. I hope we'll meet again at the top.",
                    "Watching you grow made me realize I can’t stay in this comfortable place anymore. I’m leaving to become someone who can truly stand equal to you.",
                    "We’ve fought for center for years. Now that you’ve finally taken it, I feel I can leave knowing the group has the best leader possible.",
                    "Our rivalry was the fire that kept me going. Without it, I feel my story here is finished. I’m off to find a new spark.",
                    "You were the wall I could never climb. Thank you for being my motivation. I’m graduating to find a path where I don’t have to follow you."
                ],
                'The Producer': [
                    "I've always loved creating things for this group, from the songs to the stage. Now, I want to step behind the curtain and help create dreams for others.",
                    "I’ve spent more time in the editing room than the dance studio lately. I’ve realized my true calling is producing the next generation of stars.",
                    "I want to use my experience to protect and guide new idols. I’m graduating to start my own agency and build a healthier industry.",
                    "Choreographing our last single made me realize where my heart lies. I want to be a professional creator, not just a performer.",
                    "I want to build the stages, not just stand on them. I’m moving into stage production to create the magic that I felt every night from the other side."
                ],
                'The Unwilling Idol': [
                    "This world of bright lights was more than I ever expected. Thank you for finding me, even when I couldn't find myself. But now... I'm ready to walk my own path.",
                    "I joined on a whim, but your love made me stay. However, I’ve realized I’m a person who prefers the quiet shadows to the center spotlight.",
                    "I’ve worn the 'Idol' mask for so long I almost forgot who was underneath. I’m graduating to find the person I was meant to be.",
                    "I never thought I could be a star. You proved me wrong, and for that, I’m grateful. But now I want to live a life that feels more like 'me'.",
                    "The applause is wonderful, but the pressure is heavy. I’m choosing my mental health and my own truth over the expectations of the stage."
                ],
                'Heal from a Scandal': [
                    "The past has been difficult, and your support meant the world to me. However, I've decided that for my own peace of mind, I need to step away from the public eye.",
                    "I’ve caused a lot of trouble for the members and the fans. To take responsibility and allow the group to move forward, I am graduating.",
                    "I need time to reflect on my actions and grow as a person. I don’t think I can do that while remaining in the spotlight.",
                    "I want to apologize for the disappointment I caused. I’m leaving so that I can one day stand before you again as someone you can be proud of.",
                    "The scars from recent events haven't healed. I’m graduating to find a quiet place to breathe and start my life over from zero."
                ],
                'Family Matters': [
                    "Because of my activities in this group, I've been able to support my family. Now, it's time for me to be there for them in a different way.",
                    "My family's business needs me. I’ve decided to move back to my hometown and take over the responsibilities my parents have carried for so long.",
                    "A family member is facing a health struggle, and I want to spend every possible moment by their side. My place is at home right now.",
                    "I’m the eldest daughter, and it’s time for me to support my siblings' dreams just as my family supported mine. I’m heading home to help.",
                    "I’ve spent too many years away from my parents. I want to go back to the countryside and live a life where I can see them every day."
                ]
            };            const speechOptions = reasons[member.ambition] || ["I have decided to graduate."];
            const speech = speechOptions[Math.floor(Math.random() * speechOptions.length)];
    
            const handleConfirm = () => {
                // The member data is already in modalData, so we just need to switch the modal view.
                setShowModal('graduationPath'); 
            };
    
            return (
                <ModalWrapper title={<span className="flex items-center text-pink-400"><Heart size={24} className="mr-2"/>Graduation Announcement</span>} maxWidth="max-w-lg">
                    <div className="text-center">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-pink-100/50 border-4 border-pink-200">
                            <Sparkles size={48} className="text-pink-400" />
                        </div>
                        <h3 className="text-2xl font-bold">{member.name}</h3>
                        <p className="text-sm text-pink-300 mb-4">From {member.homeGroup === 'main' ? groupName : member.homeGroup}</p>
    
                        <div className="p-4 bg-white/50 dark:bg-pink-900/30 backdrop-blur-md border border-white/20 rounded-lg text-left">
                            <p className="text-lg italic">"{speech}"</p>
                        </div>
    
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">You must now decide how to proceed with her graduation path.</p>
                    </div>
                    <div className="flex justify-center gap-2 mt-6">
                        <button onClick={handleConfirm} className="p-3 bg-pink-500 hover:bg-pink-600 text-white rounded font-bold w-full">
                            Plan Graduation Path
                        </button>
                    </div>
                </ModalWrapper>
            );
        };


    const GraduationPathModal = () => {
        const member = modalData;
        if (!member) return null;

        const isPopular = getTotalFansForMember(member) > 50000;
        const grandSendOffCost = 500000;

        const beginGraduationProcess = (memberId, finalWeek) => {
            updateMemberState(memberId, m => ({ 
                ...m, 
                isGraduating: true, 
                graduationUrgency: 101, // Set urgency > 100 to prevent re-trigger
                graduationWeek: finalWeek 
            }));
        };
        const selectGrandSendOff = () => {
            if (money < grandSendOffCost) {
                setMessage("Not enough money for a Grand Send-Off!");
                return;
            }
            
            const finalGraduationWeek = week + 12;
            beginGraduationProcess(member.id, finalGraduationWeek);
            setMoney(prev => prev - grandSendOffCost);

            // 1. Schedule only the fixed, non-customizable events
            const gradEvents = [
                { week: week + 8, type: 'FINAL_HANDSHAKE', memberId: member.id, memberName: member.name, title: `Final Handshake for ${member.name}` },
                // The Major Concert is now scheduled manually by the player
                { week: week + 12, type: 'FINAL_GRADUATION', memberId: member.id, memberName: member.name, title: `Official Graduation of ${member.name}` }
            ];
            setScheduledEvents(prev => [...prev, ...gradEvents]);

            // 2. Open the "New Release" modal so the player can create the Graduation Single
            
            setModalData({
            targetGroupId: 'main',
            songs: songs,
            sisterGroups: sisterGroups
        });

            
            setShowModal('createSong');

            // 3. Guide the player on what to do next
            addNotification({ type: 'Graduation', message: `A Grand Send-Off for ${member.name} has begun! Cost: ¥${grandSendOffCost.toLocaleString()}` });
            setMessage(`${member.name}'s graduation is set for 12 weeks from now. First, produce their graduation single. Then, schedule their graduation concert using the Manage tab.`);
        };

        const selectQuietFarewell = () => {

            const finalGraduationWeek = week + 3;
beginGraduationProcess(member.id, finalGraduationWeek);

            const gradEvents = [
                { week: week + 2, type: 'FINAL_THEATER_SHOW', memberId: member.id, memberName: member.name, title: `Final Theater Show for ${member.name}` },
                { week: week + 3, type: 'FINAL_GRADUATION', memberId: member.id, memberName: member.name }
            ];

            setScheduledEvents(prev => [...prev, ...gradEvents]);

            addNotification({ type: 'Graduation', message: `${member.name} will have a quiet graduation.` });
            setMessage(`${member.name}'s final performance has been scheduled.`);
            setShowModal(null);
            // I have also removed the "setWeek(prev => prev + 1)" line that was here, as it can cause bugs.
        };

        const selectRenegotiate = () => {
            const negotiationCost = 100000 + Math.floor(getTotalFansForMember(member) * 5);

            if (money < negotiationCost) {
                setMessage("Not enough money for this negotiation!");
                return;
            }

            // Confirm before spending a large amount of money
            if (!window.confirm(`This will cost ¥${negotiationCost.toLocaleString()}. Are you sure you want to renegotiate with ${member.name}?`)) {
                return;
            }

            setMoney(prev => prev - negotiationCost);

            // Reset the graduating member's urgency and boost their morale
            updateMemberState(member.id, m => ({ 
                ...m, 
                isGraduating: false,
                graduationUrgency: 20, // Reset to a low, safe value
                graduationWeek: undefined,
                morale: Math.min(100, (m.morale || 0) + 25) 
            }));

            // Small morale penalty for other members due to special treatment
            const otherMembersMoralePenalty = 5;
            setMembers(prev => prev.map(m => {
                if (String(m.id) !== String(member.id)) {
                    return { ...m, morale: Math.max(0, (m.morale || 0) - otherMembersMoralePenalty) };
                }
                return m;
            }));
            setSisterGroups(prev => prev.map(sg => ({
                ...sg,
                members: (sg.members || []).map(m => ({ ...m, morale: Math.max(0, (m.morale || 0) - otherMembersMoralePenalty) }))
            })));


            const successMessage = `${member.name} has agreed to stay with the group for now. (Cost: ¥${negotiationCost.toLocaleString()})`;
            addNotification({ type: 'Management', message: successMessage });
            setMessage(successMessage);
            setShowModal(null);
        };


        const selectDismissal = () => {
            if (!window.confirm(`Are you SURE you want to dismiss ${member.name}? This action is irreversible and will harm the group.`)) {
                return;
            }

            // Apply a severe morale penalty to all other members
            const moralePenalty = 40;
            setMembers(prev => prev.map(m => {
                if (String(m.id) !== String(member.id)) {
                    return { ...m, morale: Math.max(0, (m.morale || 0) - moralePenalty) };
                }
                return m;
            }));
            setSisterGroups(prev => prev.map(sg => ({
                ...sg,
                members: (sg.members || []).map(m => ({ ...m, morale: Math.max(0, (m.morale || 0) - moralePenalty) }))
            })));

            // Remove the member from the group without adding to Hall of Fame
            setMembers(prev => prev.filter(m => String(m.id) !== String(member.id)));
            setSisterGroups(prev => prev.map(sg => ({
                ...sg,
                members: (sg.members || []).filter(m => String(m.id) !== String(member.id))
            })));

            const dismissalMessage = `${member.name} has been dismissed. The sudden departure has shocked fans and remaining members.`;
            addNotification({ type: 'alert', message: dismissalMessage });
            setMessage(dismissalMessage);
            setShowModal(null);
            setSelectedMember(null);
        };


        return (
            <ModalWrapper title={`Graduation Path for ${member.name}`} maxWidth="max-w-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Choose how {member.name} will spend her final weeks with the group. This will determine the scale of her departure.
                </p>

                <div className="space-y-4">
                    <div className={`p-4 border rounded-lg ${isPopular ? 'border-yellow-400' : 'border-gray-300 opacity-60'}`}>
                        <h4 className="text-lg font-bold text-yellow-500">The Grand Send-Off</h4>
                        <ul className="list-disc list-inside text-sm my-2 space-y-1">
                            <li>Produce a "Graduation Single" using the full single system.</li>
                            <li>Hold a "Major Concert" at a Dome venue.</li>
                            <li>Includes a final handshake event.</li>
                        </ul>
                        <p className="text-sm font-semibold">Requires: High Popularity (50,000+ Fans)</p>
                        <p className="text-sm font-bold mt-2">Cost: ¥{grandSendOffCost.toLocaleString()}</p>
                        <button 
                            onClick={selectGrandSendOff}
                            disabled={!isPopular || money < grandSendOffCost}
                            className="w-full mt-3 p-2 bg-yellow-500 text-white rounded font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Select Grand Send-Off
                        </button>
                        {!isPopular && <p className="text-xs text-red-500 text-center mt-1">Member is not popular enough for this option.</p>}
                        {isPopular && money < grandSendOffCost && <p className="text-xs text-red-500 text-center mt-1">Not enough money.</p>}
                    </div>

                    <div className="p-4 border rounded-lg border-gray-300">
                        <h4 className="text-lg font-bold text-gray-700 dark:text-gray-200">The Quiet Farewell</h4>
                        <ul className="list-disc list-inside text-sm my-2 space-y-1">
                            <li>Member will participate in one final theater show.</li>
                            <li>Low cost, low impact.</li>
                        </ul>
                        <p className="text-sm font-bold mt-2">Cost: ¥0</p>
                         <button 
                            onClick={selectQuietFarewell}
                            className="w-full mt-3 p-2 bg-gray-600 text-white rounded font-bold"
                        >
                            Select Quiet Farewell
                        </button>
                    </div>
                </div>


                    <div className="p-4 border rounded-lg border-blue-400">
                        <h4 className="text-lg font-bold text-blue-500">Renegotiate Contract</h4>
                        <ul className="list-disc list-inside text-sm my-2 space-y-1">
                            <li>Attempt to convince the member to stay.</li>
                            <li>Resets their "Graduation Urgency" but does not make them immune to it in the future.</li>
                            <li>Boosts this member's morale, but slightly lowers it for everyone else.</li>
                        </ul>
                        <p className="text-sm font-bold mt-2">Cost: ¥{(100000 + Math.floor(getTotalFansForMember(member) * 5)).toLocaleString()}</p>
                         <button 
                            onClick={selectRenegotiate}
                            className="w-full mt-3 p-2 bg-blue-500 text-white rounded font-bold disabled:bg-gray-400"
                            disabled={money < (100000 + Math.floor(getTotalFansForMember(member) * 5))}
                        >
                            Attempt to Renegotiate
                        </button>
                    </div>

                                    <div className="p-4 border-2 rounded-lg border-red-500 bg-red-50 dark:bg-gray-800 mt-4">
                        <h4 className="text-lg font-bold text-red-600 dark:text-red-400">Immediate Dismissal</h4>
                        <ul className="list-disc list-inside text-sm my-2 space-y-1 text-red-800 dark:text-red-300">
                            <li>Instantly fire the member from the group.</li>
                            <li>No farewell events. The member will not be added to the Hall of Fame.</li>
                            <li>Causes a **severe** drop in group morale.</li>
                        </ul>
                        <p className="text-sm font-bold mt-2">Cost: Reputational Damage</p>
                        <button 
                            onClick={selectDismissal}
                            className="w-full mt-3 p-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 active:bg-red-800"
                        >
                            Dismiss Member
                        </button>
                    </div>

            </ModalWrapper>
        );
    };

    const RenameTheaterModal = () => {
        const theater = modalData;
        const [newName, setNewName] = useState(theater?.name || '');

        const handleConfirm = () => {
            if (!newName.trim()) return setMessage("Theater name cannot be empty.");
            renameTheater(theater.owner, newName.trim());
        };

        if (!theater) return null;

        return (
            <ModalWrapper title={`Rename ${theater.name}`}>
                <h4 className="font-semibold mb-1">New Theater Name</h4>
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Enter new theater name"
                />
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleConfirm} disabled={!newName.trim()} className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400">
                        Confirm Rename
                    </button>
                </div>
            </ModalWrapper>
        );
    };

    const CheatCodeModal = () => {
        const [code, setCode] = useState('');

        return (
            <ModalWrapper title="Enter Cheat Code">
                <input 
                    type="text" 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Enter code..."
                    onKeyDown={(e) => e.key === 'Enter' && handleCheatCode(code)}
                />
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={() => handleCheatCode(code)} className="p-2 bg-green-500 text-white rounded">Confirm</button>
                </div>
            </ModalWrapper>
        );
    };


    const RenameMemberModal = () => {
        const member = modalData;
        const [newName, setNewName] = useState(member?.name || '');
        const [newNickname, setNewNickname] = useState(member?.nickname || '');
        
        const handleConfirm = () => {
            if (!newName.trim()) return setMessage("Name cannot be empty.");
            
            updateMemberState(member.id, m => ({ 
                ...m, 
                name: newName.trim(), 
                nickname: newNickname.trim() 
            }));
            setMessage(`${member.name}'s name changed to ${newName.trim()}!`);
            setSelectedMember(prev => ({ ...prev, name: newName.trim(), nickname: newNickname.trim() }));
            setShowModal(null);
        };

        return (
            <ModalWrapper title={<span className="flex items-center"><Edit size={20} className="mr-2"/> Rename Member</span>}>
                <p className="text-sm text-gray-600 mb-4">Changing the name of: <span className='font-bold'>{member.name}</span></p>
                
                <h4 className="font-semibold mb-1">Full Name</h4>
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Enter new full name"
                />
                
                <h4 className="font-semibold mb-1">Nickname</h4>
                <input 
                    type="text" 
                    value={newNickname} 
                    onChange={(e) => setNewNickname(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="Enter new nickname (e.g., Sakura-chan)"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleConfirm} disabled={!newName.trim()} className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400">
                        Confirm Rename
                    </button>
                </div>
            </ModalWrapper>
        );
    };
    
const TeamManagementModal = ({ isEditing = false, team = null }) => {
    const [teamName, setTeamName] = useState(isEditing ? team.name : '');
    const [groupId, setGroupId] = useState(isEditing ? (team.groupId || 'main') : 'main');
    const [selectedSetlist, setSelectedSetlist] = useState(isEditing && team ? team.currentSetlistId : '');
    
    // NEW state for the filter
    const [filterKey, setFilterKey] = useState('All');
    
    // The `team.members` array should already contain unique rosterIds.
    const [selectedMembers, setSelectedMembers] = useState(isEditing ? team.members.map(id => ({ id, type: 'existing' })) : []);
    const [pendingDecision, setPendingDecision] = useState(null);

    const fullRoster = getMainGroupRoster();

    // --- NEW: Generate structured data for the new filter ---
    const mainGroupGenerations = [...new Set(fullRoster.filter(m => !m.isSisterMember).map(m => m.generation).filter(Boolean))];
    const sisterGroupDetails = sisterGroups.map(sg => ({
        ...sg,
        generations: [...new Set(fullRoster.filter(m => String(m.groupId) === String(sg.id)).map(m => m.generation).filter(Boolean))]
    }));

    // CORRECTED: Use rosterId for all operations
        // REVISED: This function now understands Kennin assignments
        const handleAddMemberClick = (member) => {
            if (selectedMembers.some(m => m.id === member.rosterId)) return;
            
            const memberHomeGroupId = member.isSisterMember ? String(member.groupId) : 'main';
            const isCrossGroupAssignment = String(memberHomeGroupId) !== String(groupId);
            const isAlreadyInAnotherTeam = !!member.teamId;

            // SPECIAL CASE: A Rival member being added to a main group team is ALWAYS a Kennin assignment. No decision needed.
            if (member.isRivalKennin && String(groupId) === 'main') {
                setSelectedMembers(prev => [...prev, { id: member.rosterId, type: 'kennin' }]);
                return;
            }

            // If a member is already in a team and you're adding them to another, this implies a KENNIN position.
            if (isAlreadyInAnotherTeam && !isCrossGroupAssignment) {
                 // Open the decision modal to ask: "Assign as Kennin?"
                 // This allows the user to confirm they want a concurrent position.
                 setPendingDecision({ ...member, assignmentType: 'kennin' });
            } else if (isCrossGroupAssignment) {
                // If it's a cross-group assignment (e.g., sister member to main team), ask "Transfer or Kennin?"
                setPendingDecision({ ...member, assignmentType: 'transfer_or_kennin' });
            }
            else {
                // This is a clean assignment (e.g., a trainee to their first team).
                setSelectedMembers(prev => [...prev, { id: member.rosterId, type: 'add' }]);
            }
        };
    
    // CORRECTED: Use rosterId from pendingDecision
    const resolveDecision = (decisionType) => {
        if (decisionType && pendingDecision) {
            setSelectedMembers(prev => [...prev, { id: pendingDecision.rosterId, type: decisionType }]);
        }
        setPendingDecision(null);
    };

    const removeMember = (memberId) => {
        setSelectedMembers(prev => prev.filter(m => m.id !== memberId));
    };
    
    // --- NEW: Updated filtering logic ---
    const filteredRoster = fullRoster.filter(member => {
        if (filterKey === 'All') return true;
        
        if (filterKey === 'main') return !member.isSisterMember;
        if (filterKey.startsWith('main-gen-')) {
            const gen = filterKey.replace('main-gen-', '');
            return !member.isSisterMember && member.generation === gen;
        }

        if (filterKey.startsWith('sg-')) {
            if (filterKey.includes('-gen-')) {
                const [sgIdStr, gen] = filterKey.replace('sg-', '').split('-gen-');
                return String(member.groupId) === sgIdStr && member.generation === gen;
            } else {
                const sgId = filterKey.replace('sg-', '');
                return String(member.groupId) === sgId;
            }
        }
        
        return false;
    });

    // CORRECTED: Use rosterId
    const handleSelectAllFiltered = () => {
        const filteredIds = filteredRoster.map(m => m.rosterId);
        const allCurrentlySelected = filteredIds.every(id => selectedMembers.some(sm => sm.id === id));
        if (allCurrentlySelected) {
            setSelectedMembers(prev => prev.filter(sm => !filteredIds.includes(sm.id)));
        } else {
            const newSelections = filteredIds
                .filter(id => !selectedMembers.some(sm => sm.id === id))
                .map(id => ({ id, type: 'add' }));
            setSelectedMembers(prev => [...prev, ...newSelections]);
        }
    };
    
    const handleSave = () => {
        const teamId = isEditing ? team.id : null;
        saveTeam(teamId, teamName, groupId, selectedMembers, selectedSetlist);
    };

    const handleDelete = () => {
        if (isEditing && window.confirm(`Are you sure you want to disband Team ${team.name}?`)) {
            deleteTeam(team.id);
        }
    };

    const getMemberWarning = (member) => {
        const allTeams = [
            ...(member.teamName ? [member.teamName] : []),
            ...(member.concurrentTeams || []).map(t => t.name)
        ];
        if (allTeams.length === 0) return null;
        const relevantTeams = isEditing ? allTeams.filter(tName => tName !== team.name) : allTeams;
        if (relevantTeams.length === 0) return null;
        return `(In ${relevantTeams.join(', ')})`;
    };

    return (
        <ModalWrapper title={isEditing ? `Edit Team: ${team.name}` : "Create New Team"}>
                {pendingDecision && <AssignmentDecisionModal member={pendingDecision} onResolve={resolveDecision} />}
            <div className="space-y-3 text-sm">
                <input type="text" placeholder="Team Name" value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700" />
                
                <select value={groupId} onChange={e => setGroupId(e.target.value)} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700" disabled={isEditing}>
                    <option value="main">Team for: {groupName} (Main)</option>
                    {sisterGroups.map(sg => <option key={sg.id} value={sg.id}>Team for: {sg.name}</option>)}
                </select>

                <select value={selectedSetlist || ''} onChange={e => setSelectedSetlist(Number(e.target.value))} className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700">
                    <option value="">-- Select a Setlist --</option>
                    {allSetlists.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>

                <div>
                    <h3 className="font-semibold mb-2">Select Members ({selectedMembers.length})</h3>
                    
                    {/* --- NEW: Filter Dropdown --- */}
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-xs">Filter Roster</h4>
                        <select 
                            value={filterKey} 
                            onChange={e => setFilterKey(e.target.value)} 
                            className="w-1/2 p-2 text-xs rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                        >
                            <option value="All">All</option>
                            <optgroup label="Groups">
                                <option value="main">{groupName}</option>
                                {sisterGroups.map(sg => (
                                    <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>
                                ))}
                            </optgroup>
                            {mainGroupGenerations.length > 0 && (
                                <optgroup label={`${groupName} Generations`}>
                                    {mainGroupGenerations.map(gen => (
                                        <option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>
                                    ))}
                                </optgroup>
                            )}
                            {sisterGroupDetails.map(sg => (
                                sg.generations.length > 0 && (
                                    <optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Generations`}>
                                        {sg.generations.map(gen => (
                                            <option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>
                                        ))}
                                    </optgroup>
                                )
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <button onClick={handleSelectAllFiltered} className="px-3 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600">Toggle Select All (Filtered)</button>
                    </div>

                    <div className="border rounded p-2 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        {filteredRoster.map(member => {
                            const isSelected = selectedMembers.some(m => m.id === member.rosterId);
                            return (
                                <div key={member.rosterId} className="flex items-center justify-between p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{member.name}</span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                Vo.{Math.round(member.singing)} Da.{Math.round(member.dancing)} Vi.{Math.round(member.visual)} Ch.{Math.round(member.charisma)} In.{Math.round(member.intelligence)} Fans:{getTotalFansForMember(member).toLocaleString()}
                                                {getMemberWarning(member) && <span className="text-yellow-500 ml-2 font-semibold">{getMemberWarning(member)}</span>}
                                            </span>
                                    </div>
                                    <button onClick={() => isSelected ? removeMember(member.rosterId) : handleAddMemberClick(member)} className={`px-2 py-1 text-xs rounded ${isSelected ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                        {isSelected ? 'Remove' : 'Add'}
                                    </button>
                                </div>
                            )
                        })}
                        {filteredRoster.length === 0 && <p className="text-center text-gray-500 italic py-4">No members match the current filter.</p>}
                    </div>
                </div>
            </div>

            <div className={`flex ${isEditing ? 'justify-between' : 'justify-end'} items-center mt-4`}>
                {isEditing && (
                    <button onClick={handleDelete} className="p-2 bg-red-600 text-white rounded font-semibold">Disband Team</button>
                )}
                <div className="flex gap-2">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                    <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded font-semibold">{isEditing ? 'Save Changes' : 'Create Team'}</button>
                </div>
            </div>
        </ModalWrapper>
    );
};

    const AssignmentDecisionModal = ({ member, onResolve }) => {
        const assignmentType = member.assignmentType || (member.isCrossGroupAssignment ? 'transfer_or_kennin' : 'kennin');
        
        return (
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
                    <h3 className="text-lg font-bold mb-4">Confirm Assignment</h3>
                    <p className="mb-4 text-sm">
                        <span className="font-semibold">{member.name}</span> is already assigned to another team or group. How do you want to add them?
                    </p>
                    <div className="flex flex-col gap-3">
                        {assignmentType.includes('kennin') && (
                            <button onClick={() => onResolve('kennin')} className="w-full p-3 bg-purple-600 text-white rounded font-semibold text-left">
                                <p className="font-bold">Assign as Kennin (Concurrent)</p>
                                <p className="text-xs font-normal">Member will belong to both teams.</p>
                            </button>
                        )}
                        {assignmentType.includes('transfer') && (
                             <button onClick={() => onResolve('transfer')} className="w-full p-3 bg-blue-600 text-white rounded font-semibold text-left">
                                <p className="font-bold">Transfer Member</p>
                                <p className="text-xs font-normal">Member will leave their old team/group.</p>
                            </button>
                        )}
                        <button onClick={() => onResolve(null)} className="w-full p-2 bg-gray-300 dark:bg-gray-600 rounded mt-2">Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

const TeamDetailsModal = ({ team }) => {
    const fullRoster = getMainGroupRoster();
    const reversedHistory = [...(team.history || [])].reverse();

    return (
        <ModalWrapper title={`Team Details: ${team.name}`}>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <div>
            <h4 className="font-semibold text-lg mb-2 border-b pb-1">Current Members ({team.members.length})</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
                {team.members.map(memberId => {
                    const member = fullRoster.find(m => String(m.id) === String(memberId) || String(m.rosterId) === String(memberId));
                    if (!member) return <p key={memberId} className="text-gray-400">Unknown Member</p>;

                    return (
                        <div key={member.rosterId} className="flex items-center justify-between p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                            <button onClick={() => { setSelectedMember(member); setShowModal('memberDetails'); }} className="text-sm text-left truncate hover:underline">
                                {member.name}
                            </button>
                            {member.kennin && (
                                <span className="ml-2 text-xs font-semibold bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                    Kennin
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>

<div>
    <h4 className="font-semibold text-lg mb-2 border-b pb-1">Team Captain</h4>
    <p className="text-xs text-gray-500 mb-1">Appoint a captain for Team {team.name}. They will provide a passive bonus to their teammates.</p>
    <select
        value={groupRoles[team.id] || ''}
        onChange={(e) => appointCaptain(team.id, e.target.value)}
        className="w-full p-1.5 text-sm border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
    >
        <option value="">-- Appoint a Team Captain --</option>
        {team.members.map(memberId => {
            const member = fullRoster.find(m => String(m.id) === String(memberId) || String(m.rosterId) === String(memberId));
            if (!member) return null;
            return (
                <option key={member.rosterId} value={member.rosterId}>{member.name}</option>
            )
        })}
    </select>
</div>


                <div>
                    <h4 className="font-semibold text-lg mb-2 border-b pb-1">Team History</h4>
                    <div className="space-y-3">
                        {reversedHistory.map((entry, index) => (
                            <div key={index} className="text-sm">
                                <p className="font-semibold">{entry.event}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Week {entry.week}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4 pt-2 border-t">
                <button onClick={() => setShowModal(null)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded font-semibold">Close</button>
            </div>
        </ModalWrapper>
    );
};

const SetlistDetailsModal = ({ setlist, allTheaterSongs, getFormattedDateForWeek }) => {
    if (!setlist) return null;

    const trackDetails = (setlist.tracks || []).map(trackId => 
        allTheaterSongs.find(song => song.id === trackId)
    ).filter(Boolean);

    const reversedHistory = [...(setlist.usageHistory || [])].reverse();

    return (
        <ModalWrapper title={`Setlist Details: ${setlist.name}`} maxWidth="max-w-lg">
            <div className="space-y-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
                    <p><strong>Created:</strong> Week {setlist.creationWeek} ({getFormattedDateForWeek(setlist.creationWeek)})</p>
                    <p><strong>Theme:</strong> {setlist.theme}</p>
                    <p><strong>Difficulty:</strong> {setlist.difficulty}</p>
                    <p><strong>Original Cost:</strong> ¥{setlist.cost.toLocaleString()}</p>
                </div>
                
                <div>
                    <h4 className="font-semibold text-lg mb-2 border-b pb-1">Usage History</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-800">
                        {reversedHistory.length > 0 ? reversedHistory.map((entry, index) => (
                            <div key={index} className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm text-sm">
                                <p className="font-bold">{entry.teamName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Wk {entry.startWeek} to {entry.endWeek ? `Wk ${entry.endWeek}` : 'Present'}
                                </p>
                            </div>
                        )) : <p className="text-gray-500 italic text-sm">This setlist has not been used by any team yet.</p>}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg mb-2 border-b pb-1">Tracklist ({trackDetails.length} songs)</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-800">
                        {trackDetails.map((track, index) => (
                            <div key={track.id} className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm">
                                <p className="font-bold">{`M${index + 1}: ${track.name}`}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{track.type}</p>
                            </div>
                        ))}
                         {trackDetails.length === 0 && <p className="text-gray-500 italic">No original tracks found for this setlist.</p>}
                    </div>
                </div>
            </div>
            <div className="flex justify-end mt-4 pt-2 border-t">
                <button onClick={() => setShowModal(null)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded font-semibold">Close</button>
            </div>
        </ModalWrapper>
    );
};


const MoveMemberModal = ({ member, setShowModal }) => {
    // --- SETUP: Unified UI and Logic ---
    if (!member) return null;

    const isRival = !!member.isRivalKennin;

    const allPlayerGroups = [{ id: 'main', name: groupName }, ...(sisterGroups || [])];
const allGroups = isRival
    ? [{ id: 'rival_home_group', name: member.homeGroup }, ...allPlayerGroups]
    : allPlayerGroups;

    // 1. Find the member's true current home group ID from the actual state.
    const findCurrentHomeGroupId = () => {
        if (isRival) {
            return 'rival_home_group'; // Use a special, stable ID for the rival's unchangeable home.
        }
        if (member.isSisterMember) {
            const parentSg = sisterGroups.find(g => g.name === member.homeGroup);
            if (parentSg) return parentSg.id;
        }
        return 'main'; // Default for main group members or as a fallback.
    };

    // Correctly determine the initial kennin status based on whether the member is a rival or not.
    const getInitialKenninNames = () => {
        if (isRival) {
            // A rival's kennin is stored in their special 'kenninInfo' object.
const exchangeInfo = exchangeStudents.find(ex => ex.member.rosterId === member.rosterId);
return exchangeInfo ? [exchangeInfo.member.kenninInfo.groupName] : [];
        }
        // Your own members use the 'kenninGroups' array.
        return member.kenninGroups || [];
    };

    const initialHomeGroupId = findCurrentHomeGroupId();
    const initialKenninGroupNames = getInitialKenninNames();

    // 2. Form state
    const [newHomeGroup, setNewHomeGroup] = useState(String(initialHomeGroupId));
    const [kenninStatus, setKenninStatus] = useState(initialKenninGroupNames);

    const handleConfirmMove = () => {
        // --- NEW: Special Handler for Rival Members ---
        if (isRival) {
            const newKenninGroupName = kenninStatus.length > 0 ? kenninStatus[0] : null;
            const oldKenninGroupName = initialKenninGroupNames.length > 0 ? initialKenninGroupNames[0] : null;

            if (newKenninGroupName === oldKenninGroupName) {
                setMessage("No changes were made.");
                return setShowModal(null);
            }
            if (!newKenninGroupName) {
                 setMessage("A rival exchange member must have a concurrent position.");
                 return; // Prevent removing their only kennin.
            }

            const historyEvent = { week: week, event: `Concurrent position moved from ${oldKenninGroupName} to ${newKenninGroupName}` };

            setExchangeStudents(prev => prev.map(ex => {
                if (ex.member.rosterId === member.rosterId) {
                    return {
                        ...ex,
                        member: {
                            ...ex.member,
                            kenninInfo: { ...ex.member.kenninInfo, groupName: newKenninGroupName },
                            teamHistory: [...(ex.member.teamHistory || []), historyEvent],
                            teamId: null,
                            teamName: null,
                        }
                    };
                }
                return ex;
            }));
            
            setMessage(`${member.name}'s concurrent position was updated to ${newKenninGroupName}.`);
            addNotification({ type: 'Management', message: `${member.name}'s placement was updated.` });
            setShowModal(null);
            setSelectedMember(null); // Deselect to force UI refresh
            return; // IMPORTANT: Stop execution here.
        }

        // --- Existing Logic for your own members ---
        const finalNewHomeGroup = allPlayerGroups.find(g => String(g.id) === newHomeGroup);
        const originalHomeGroup = allPlayerGroups.find(g => String(g.id) === String(initialHomeGroupId));
        const wasTransferred = finalNewHomeGroup.id !== originalHomeGroup.id;

        const addedKennins = kenninStatus.filter(name => !initialKenninGroupNames.includes(name));
        const removedKennins = initialKenninGroupNames.filter(name => !kenninStatus.includes(name));
        let historyEvents = [];

        if (wasTransferred) historyEvents.push({ week: week, event: `Transferred from ${originalHomeGroup.name} to ${finalNewHomeGroup.name}` });
        addedKennins.forEach(name => historyEvents.push({ week: week, event: `Given a Concurrent Position in ${name}` }));
        removedKennins.forEach(name => historyEvents.push({ week: week, event: `Concurrent Position in ${name} canceled` }));

        if (historyEvents.length === 0) {
            setMessage("No changes were made.");
            return setShowModal(null);
        }

        // Create deep copies to modify safely
        let nextMembers = JSON.parse(JSON.stringify(members));
        let nextSisterGroups = JSON.parse(JSON.stringify(sisterGroups));
        let memberToMove = JSON.parse(JSON.stringify(member));

        // Part 1: Remove the member from their original group if a transfer occurred
        if (wasTransferred) {
            if (originalHomeGroup.id === 'main') {
                nextMembers = nextMembers.filter(m => String(m.id) !== String(memberToMove.id));
            } else {
                const sgIndex = nextSisterGroups.findIndex(sg => String(sg.id) === String(originalHomeGroup.id));
                if (sgIndex > -1) {
                    nextSisterGroups[sgIndex].members = (nextSisterGroups[sgIndex].members || []).filter(m => String(m.id) !== String(memberToMove.id));
                }
            }
        }
        
// Part 2: Prepare the final member object with updated properties
const finalUpdatedMember = {
    ...memberToMove,
    homeGroup: finalNewHomeGroup.name,
    kenninGroups: kenninStatus,
    teamHistory: [...(memberToMove.teamHistory || []), ...historyEvents],
    teamId: wasTransferred ? null : memberToMove.teamId, // If transferred, they become a trainee of the new home group.
    teamName: wasTransferred ? null : memberToMove.teamName, // Also reset team name on transfer.
};
// Clean up temporary properties that shouldn't be saved on the member object itself
delete finalUpdatedMember.rosterId;
delete finalUpdatedMember.isSisterMember;
delete finalUpdatedMember.displayGroupName;

// Part 3: Add or Update the member in their final location
if (finalNewHomeGroup.id === 'main') {
    if (wasTransferred) {
        // Find the highest existing ID in the main group to prevent collisions.
        const newMainId = (nextMembers.length > 0 ? Math.max(0, ...nextMembers.map(m => m.id)) : 0) + 1;
        finalUpdatedMember.id = newMainId;
        nextMembers.push(finalUpdatedMember);
    } else {
        // This is a Kennin-only update for a member already in the main group.
        nextMembers = nextMembers.map(m => String(m.id) === String(memberToMove.id) ? finalUpdatedMember : m);
    }
} else { // Destination is a sister group
    const destSgIndex = nextSisterGroups.findIndex(sg => String(sg.id) === String(finalNewHomeGroup.id));
    if (destSgIndex > -1) {
        if (wasTransferred) {
            const destSgMembers = nextSisterGroups[destSgIndex].members || [];
            // Find the highest existing ID in the destination sister group.
            const newSisterId = (destSgMembers.length > 0 ? Math.max(0, ...destSgMembers.map(m => m.id)) : 0) + 1;
            finalUpdatedMember.id = newSisterId;
            nextSisterGroups[destSgIndex].members.push(finalUpdatedMember);
        } else {
            // This is a Kennin-only update for a member already in this sister group
            nextSisterGroups[destSgIndex].members = (nextSisterGroups[destSgIndex].members || []).map(m => String(m.id) === String(memberToMove.id) ? finalUpdatedMember : m);
        }
    }
}

// Part 4: Commit all state changes
setMembers(nextMembers);
setSisterGroups(nextSisterGroups);

setMessage(`${member.name}'s placement was updated.`);
addNotification({ type: 'Management', message: `${member.name}'s placement was updated.` });
setShowModal(null);
setSelectedMember(null); // Deselect to force UI refresh
        };
    
        // --- The Unified UI ---
        return (
            <ModalWrapper title={<span className="flex items-center"><Plane size={20} className="mr-2"/> Manage Placement</span>}>
                <p className="mb-3">Member: <span className="font-bold">{member.name}</span></p>
                <h4 className="font-semibold mb-1 mt-3">Home Group (Transfer)</h4>
                <p className="text-xs text-gray-500 mb-2">Primary group assignment.</p>
                <select value={newHomeGroup} onChange={(e) => {
                    const selectedGroupId = e.target.value;
                    setNewHomeGroup(selectedGroupId);
                    const selectedGroupName = allGroups.find(g => g.id === selectedGroupId)?.name;
                    if (kenninStatus.includes(selectedGroupName)) {
                        setKenninStatus(prev => prev.filter(name => name !== selectedGroupName));
                    }
                }} className="w-full p-2 border rounded mb-4 dark:bg-gray-800 dark:border-gray-600">
                    {allGroups.map(group => (<option key={group.id} value={group.id}>{group.name}</option>))}
                </select>
    
                <h4 className="font-semibold mb-1 mt-3">Concurrent Positions (Kennin)</h4>
                <p className="text-xs text-gray-500 mb-2">Assign additional group memberships.</p>
                <div className="space-y-2 max-h-40 overflow-y-auto p-2 border rounded dark:border-gray-600">
                    {allGroups.filter(g => g.id !== newHomeGroup).map(group => (
                        <div key={group.id} className="flex items-center justify-between">
                            <label className="text-gray-700 dark:text-gray-300">
                                <input type="checkbox" checked={kenninStatus.includes(group.name)} onChange={() => {
                                    setKenninStatus(prev => prev.includes(group.name) ? prev.filter(n => n !== group.name) : [...prev, group.name]);
                                }} className="mr-2"/>
                                {group.name}
                            </label>
                        </div>
                    ))}
                </div>
    
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                    <button onClick={handleConfirmMove} className="p-2 bg-blue-500 text-white rounded">Confirm Update</button>
                </div>
            </ModalWrapper>
        );
    };

    const MediaJobModal = () => {
      if (showModal !== 'mediaJob') return null;

      const [selectedMemberId, setSelectedMemberId] = useState('');
      const [strategy, setStrategy] = useState('normal');
      
      const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable);

      const handleConfirm = () => {
          if (!selectedMemberId) return;
          
          const memberObject = getMemberById(selectedMemberId);
          if (!memberObject) return; 

          // This part remains the same
          setMoney(prev => prev - 1000);
          setMediaJobDoneThisWeek(true);

          let successChance = 0.65 + (memberObject.variety / 400) + (memberObject.charisma / 600); // Max ~0.65 + 0.25 + 0.16 = 1.06
          if (strategy === 'safe') successChance = Math.min(1, successChance * 1.2);
          if (strategy === 'risky') successChance *= 0.7;
          
          const roll = Math.random();
          let notificationMsg = '';
          
          if (roll < successChance) {
              let fanGain = 500 + Math.floor((memberObject.variety || 0) * 10) + Math.floor((memberObject.charisma || 0) * 5);
              if (strategy === 'risky') fanGain *= 2.5;
              if (strategy === 'safe') fanGain *= 0.6;
              fanGain = Math.floor(fanGain);
              
              notificationMsg = `Success! ${memberObject.name}'s media job was well-received, gaining ${fanGain.toLocaleString()} new casual fans.`;
              updateMemberState(selectedMemberId, m => ({ 
                  ...m, 
                  fans: { 
                      hardcore: m.fans?.hardcore || 0,
                      casual: (m.fans?.casual || 0) + fanGain 
                  },
                  morale: Math.min(100, (m.morale || 0) + 5)
              }));
          } else {
              let fanLoss = 250;
              if (strategy === 'risky') fanLoss = 2000;
              
              notificationMsg = `Failure... ${memberObject.name}'s media job flopped, losing ${fanLoss.toLocaleString()} casual fans.`;
              updateMemberState(selectedMemberId, m => ({ 
                  ...m, 
                  fans: { 
                      hardcore: m.fans?.hardcore || 0,
                      casual: Math.max(0, (m.fans?.casual || 0) - fanLoss)
                  },
                  morale: Math.max(0, (m.morale || 0) - 10)
              }));
          }

          addNotification({ type: 'Fans', message: notificationMsg });
          setMessage(notificationMsg);
          setShowModal(null);
      };
      
      return (
          <ModalWrapper title="Solo Media Appearance" maxWidth="max-w-2xl">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send a member on a solo media job. This can only be done once per week.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Member Selection List */}
                  <div className="space-y-1 max-h-[400px] overflow-y-auto border rounded p-1 bg-gray-50 dark:bg-gray-900">
                      {availableMembers.map((member, index) => (
                          <div
                              key={`${member.id}-${index}`}
                              className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedMemberId === member.id ? 'bg-blue-200 dark:bg-blue-800 shadow' : 'bg-white dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                              onClick={() => setSelectedMemberId(member.id)}
                          >
                              <div>
                                  <p className="font-semibold text-sm">{member.name}</p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                      Va: {Math.round(member.variety)} | Ch: {Math.round(member.charisma)} | Fans: {getTotalFansForMember(member).toLocaleString()}
                                  </p>
                              </div>
                              <input
                                  type="radio"
                                  name="selected_member"
                                  checked={selectedMemberId === member.id}
                                  readOnly
                                  className="form-radio h-4 w-4 text-blue-600"
                              />
                          </div>
                      ))}
                      {availableMembers.length === 0 && <p className="text-center text-gray-500 p-4">No members are available for this job.</p>}
                  </div>

                  {/* Strategy and Confirmation */}
                  <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex flex-col justify-between">
                      <div>
                          <h4 className="font-bold mb-2">Strategy</h4>
                          <select
                              value={strategy}
                              onChange={e => setStrategy(e.target.value)}
                              className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
                          >
                              <option value="safe">Safe (High success, low reward)</option>
                              <option value="normal">Normal (Standard risk & reward)</option>
                              <option value="risky">Risky (Low success, high reward)</option>
                          </select>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              The member's <strong>Variety</strong> and <strong>Charisma</strong> stats influence the outcome.
                          </p>
                      </div>

                      <div className="flex flex-col gap-2 mt-4">
                           <button onClick={() => setShowModal(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">Cancel</button>
                           <button onClick={handleConfirm} disabled={!selectedMemberId || mediaJobDoneThisWeek || money < 1000} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-blue-800/50">
                              Confirm Job (¥1,000)
                           </button>
                      </div>
                  </div>
              </div>
          </ModalWrapper>
      );
    };

      const GroupMediaModal = () => {
        // --- NEW: State for a multi-step modal ---
        const [step, setStep] = useState('job_selection');
        const [selectedJob, setSelectedJob] = useState(null);
        const [selectedMemberIds, setSelectedMemberIds] = useState([]);
        // --- NEW: State for the filter dropdown ---
        const [memberFilter, setMemberFilter] = useState('all');
  
        const jobs = [
            { id: 'music_show', name: 'Major Music Show', members: 7, multiplier: 1.5 },
            { id: 'awards_show', name: 'Year-End Awards Show', members: 16, multiplier: 3 },
            { id: 'variety_program', name: 'Popular Variety Program', members: 5, multiplier: 1 },
            { id: 'web_series', name: 'Sponsored Web Series', members: 4, multiplier: 1.2 }
        ];
        
        const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable);

        // --- NEW: Generate data for the filter dropdown ---
        const mainGroupGenerations = [...new Set(availableMembers.filter(m => !m.isSisterMember).map(m => m.generation).filter(Boolean))];
        const sisterGroupDetails = sisterGroups.map(sg => ({
            ...sg,
            generations: [...new Set(availableMembers.filter(m => m.groupId === sg.id).map(m => m.generation).filter(Boolean))]
        }));

        // --- NEW: Logic to filter members based on the dropdown selection ---
        let filteredMembers = availableMembers;
        if (memberFilter !== 'all') {
            if (memberFilter === 'main') {
                filteredMembers = availableMembers.filter(m => !m.isSisterMember);
            } else if (memberFilter.startsWith('main-gen-')) {
                const gen = memberFilter.replace('main-gen-', '');
                filteredMembers = availableMembers.filter(m => !m.isSisterMember && m.generation === gen);
            } else if (memberFilter.startsWith('sg-')) {
                if (memberFilter.includes('-gen-')) {
                    const [sgIdStr, gen] = memberFilter.replace('sg-', '').split('-gen-');
                    const sgId = parseInt(sgIdStr, 10);
                    filteredMembers = availableMembers.filter(m => m.groupId === sgId && m.generation === gen);
                } else {
                    const sgId = parseInt(memberFilter.replace('sg-', ''), 10);
                    filteredMembers = availableMembers.filter(m => m.groupId === sgId);
                }
            }
        }
  
        // --- MODIFIED: selectAll and deselectAll now use the 'filteredMembers' list ---
        const selectAll = () => {
          setSelectedMemberIds(prev => [...new Set([...prev, ...filteredMembers.map(m => m.id)])]);
        };
  
        const deselectAll = () => {
            const filteredIds = new Set(filteredMembers.map(m => m.id));
            setSelectedMemberIds(prev => prev.filter(id => !filteredIds.has(id)));
        };
  
        const handleJobSelect = (job) => {
            if (groupMediaJobDoneThisWeek) {
              setMessage("You can only do one group media job per week.");
              return;
            }
            if (money < 20000) {
              setMessage("You need at least ¥20,000 for a group media job.");
              return;
            }
            setSelectedJob(job);
            setStep('member_selection');
        };
  
        const toggleMember = (memberId) => {
            setSelectedMemberIds(prev => 
                prev.includes(memberId) 
                    ? prev.filter(id => id !== memberId) 
                    : [...prev, memberId]
            );
        };
  
        const handleConfirm = () => {
            if (!selectedJob || selectedMemberIds.length < selectedJob.members) {
                setMessage(`You need to select at least ${selectedJob.members} members for this job.`);
                return;
            }
            startGroupMediaJob(selectedJob.id, selectedMemberIds);
        };
  
        const renderJobSelection = () => (
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Send a sub-unit on a high-impact media job. Cost: ¥20,000. This can only be done once per week.</p>
                <div className="space-y-3">
                    {jobs.map(job => (
                        <div key={job.id} className="p-3 border rounded bg-gray-50 dark:bg-gray-800 dark:border-gray-700 flex justify-between items-center">
                            <div>
                                <span className="font-bold dark:text-gray-100">{job.name}</span>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Min Members: {job.members} | Fan Boost: x{job.multiplier}</p>
                            </div>
                            <button 
                                onClick={() => handleJobSelect(job)} 
                                disabled={groupMediaJobDoneThisWeek || money < 20000}
                                className="p-2 bg-blue-500 text-white rounded text-sm disabled:bg-gray-400"
                            >
                                Select Job
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 dark:text-gray-200 rounded">Cancel</button>
                </div>
            </div>
        );
  
        const renderMemberSelection = () => {
            return (
                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Select members for: <span className="font-bold">{selectedJob.name}</span>. Requires at least {selectedJob.members} members.</p>
                    
                    {/* --- MODIFIED: Added filter dropdown and updated buttons --- */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex gap-2">
                            <button onClick={selectAll} className="px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded font-semibold hover:bg-blue-200">Select All (Filtered)</button>
                            <button onClick={deselectAll} className="px-3 py-1 text-xs bg-gray-200 text-gray-800 rounded font-semibold hover:bg-gray-300">Deselect All (Filtered)</button>
                        </div>
                        <div>
                            <label htmlFor="member-filter" className="text-sm mr-2 dark:text-gray-300">Filter:</label>
                            <select id="member-filter" value={memberFilter} onChange={e => setMemberFilter(e.target.value)} className="p-1 rounded border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 text-sm">
                                <option value="all">All Available Members</option>
                                <optgroup label="Groups">
                                    <option value="main">{groupName}</option>
                                    {sisterGroups.map(sg => (
                                        <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>
                                    ))}
                                </optgroup>
                                {mainGroupGenerations.length > 0 && (
                                    <optgroup label={`${groupName} Generations`}>
                                        {mainGroupGenerations.map(gen => (
                                            <option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>
                                        ))}
                                    </optgroup>
                                )}
                                {sisterGroupDetails.map(sg => (
                                    sg.generations.length > 0 && (
                                        <optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Generations`}>
                                            {sg.generations.map(gen => (
                                                <option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>
                                            ))}
                                        </optgroup>
                                    )
                                ))}
                            </select>
                        </div>
                    </div>
  
                    {/* --- MODIFIED: Now maps over 'filteredMembers' --- */}
                    <div className="space-y-1 max-h-[400px] overflow-y-auto border-t border-b dark:border-gray-700 p-1">
                        {filteredMembers.map(member => (
                            <div key={member.rosterId} className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedMemberIds.includes(member.id) ? 'bg-blue-100 dark:bg-blue-800' : 'bg-white dark:bg-gray-700/50 hover:bg-gray-50'}`} onClick={() => toggleMember(member.id)}>
                                <div>
                                    <p className="font-semibold text-sm">{member.name} {member.isSisterMember && <span className="text-xs text-gray-500">({member.displayGroupName})</span>}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Fans: {getTotalFansForMember(member).toLocaleString()}</p>
                                </div>
                                <input type="checkbox" checked={selectedMemberIds.includes(member.id)} readOnly className="form-checkbox h-4 w-4 text-blue-600"/>
                            </div>
                        ))}
                    </div>
  
                    <div className="flex justify-between items-center mt-6 pt-4 border-t dark:border-gray-600">
                        <p className={`font-bold text-lg dark:text-gray-100 ${selectedMemberIds.length < selectedJob.members ? 'text-red-500' : 'text-green-500'}`}>Selected: {selectedMemberIds.length} / {selectedJob.members} (min)</p>
                        <div className="flex gap-2">
                            <button onClick={() => { setStep('job_selection'); setSelectedMemberIds([]); }} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Back</button>
                            <button onClick={handleConfirm} disabled={selectedMemberIds.length < selectedJob.members} className="p-3 bg-green-500 text-white rounded font-bold disabled:bg-gray-400">
                                Confirm Job (¥20,000)
                            </button>
                        </div>
                    </div>
                </div>
            );
        };
  
        return (
            <ModalWrapper title="Group Media Appearance" maxWidth="max-w-2xl">
                {step === 'job_selection' ? renderJobSelection() : renderMemberSelection()}
            </ModalWrapper>
        );
      };


    const SenbatsuPromotionModal = () => {
        if (!modalData || !modalData.single) return null;

        const { single } = modalData;
        const titleTrack = single.tracks.find(t => t.type === 'title');
        if (!titleTrack) return null;

        const senbatsuMembers = titleTrack.members || [];
        const kami7Ids = (titleTrack.lineup ? Object.entries(titleTrack.lineup)
            .filter(([, row]) => row === '1st Row' || row === '2nd Row' || row === '3rd Row')
            .map(([id]) => id) : []).slice(0, 7);        
            
        const handleStartPromotion = (promoType) => {
            startSenbatsuPromotion(promoType, single.id);
        };

        const promotions = [
            { id: 'magazineCover', name: 'Magazine Cover (Kami 7)', cost: 75000, description: 'Feature the top 7 members on a famous magazine cover. Greatly boosts their individual popularity.', requirement: () => kami7Ids.length >= 7, reqText: 'Requires at least 7 members in the top three rows.' },
            { id: 'musicShow', name: 'Weekly Music Show', cost: 100000, description: 'Perform on a popular TV music show. High stamina cost, but boosts sales and gains fans based on performance.', requirement: () => senbatsuMembers.length > 0, reqText: 'Requires at least 1 Senbatsu member.' },
            { id: 'handshakeEvent', name: 'National Handshake Event', cost: 200000, description: 'Hold a huge event to convert casual fans into hardcore fans. Very high stamina and stress cost.', requirement: () => senbatsuMembers.length >= 12, reqText: 'Requires at least 12 Senbatsu members.' },
            { id: 'tvSpecial', name: 'Senbatsu TV Special', cost: 150000, description: 'A 30-minute TV special focusing on the members. Drains stamina but provides a good fan gain and boosts sales.', requirement: () => senbatsuMembers.length >= 8, reqText: 'Requires at least 8 Senbatsu members.' },
            { id: 'radioUnit', name: 'Radio Guesting Unit', cost: 20000, description: 'Send the 4 most charismatic members to a popular radio show. A cheap way to gain some fans.', requirement: () => senbatsuMembers.length >= 4, reqText: 'Requires at least 4 Senbatsu members.' },
            { id: 'productCM', name: 'Product Commercial (CM)', cost: -500000, description: 'The top 5 visual members star in a TV commercial. Earns a large amount of money and boosts their fame.', requirement: () => senbatsuMembers.filter(m => m.visual >= 75).length >= 5, reqText: 'Requires at least 5 Senbatsu members with 75+ Visual.' },
            { id: 'animeTieIn', name: 'Anime Theme Song Tie-in', cost: 1000000, description: 'Secure a deal for the song to be an anime opening. Extremely expensive, but provides massive, widespread exposure.', requirement: () => true, reqText: '' },
            { id: 'guerillaLive', name: 'Guerilla Live Concert', cost: 120000, description: 'Stage a surprise mini-concert in a public square. High risk, high reward.', requirement: () => senbatsuMembers.length >= 5, reqText: 'Requires at least 5 Senbatsu members.' },
            { id: 'cdShopTour', name: 'CD Shop Greeting Tour', cost: 60000, description: 'Visit major CD shops to boost physical sales potential. Medium stamina cost.', requirement: () => senbatsuMembers.length >= 4, reqText: 'Requires at least 4 Senbatsu members.' },
            { id: 'varietyShow', name: 'Variety Game Show', cost: 250000, description: 'Senbatsu competes on a game show. Success is based on their Variety skill and can even provide a small skill boost.', requirement: () => senbatsuMembers.length >= 6, reqText: 'Requires at least 6 Senbatsu members.' },
            { id: 'photobook', name: 'Official Photobook Release', cost: 300000, description: 'Produce a high-quality photobook. High initial cost, but generates income and boosts fans based on Visuals.', requirement: () => senbatsuMembers.length >= 7, reqText: 'Requires at least 7 Senbatsu members.' },
            { id: 'karaoke', name: 'Karaoke Bar Tie-in', cost: 15000, description: 'Feature the single\'s MV in karaoke booths nationwide. A cheap and easy way to gain passive exposure.', requirement: () => true, reqText: '' },
        ].sort((a, b) => a.cost - b.cost);

        return (
            <ModalWrapper title={`Senbatsu Promotion: ${single.name}`} maxWidth="max-w-3xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose a high-impact promotional activity for the Senbatsu members. Each can only be performed once per single.</p>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {promotions.map(promo => {
                        const meetsReq = promo.requirement();
                        const alreadyDone = (completedPromotions[single.id] || []).includes(promo.id);
                        return (
                            <div key={promo.id} className={`p-4 border rounded-lg ${meetsReq && !alreadyDone ? 'bg-white dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-700 opacity-60'}`}>
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-lg">{promo.name}</h4>
                                    <span className={`font-bold ${promo.cost > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {promo.cost > 0 ? `Cost: ¥${promo.cost.toLocaleString()}` : `Income: ¥${(-promo.cost).toLocaleString()}`}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-600 dark:text-gray-400 my-1">{promo.description}</p>
                                <div className="flex justify-end items-center mt-2">
                                     <button
                                        onClick={() => handleStartPromotion(promo.id)}
                                        disabled={!meetsReq || money < promo.cost || alreadyDone}
                                        className="px-4 py-2 bg-blue-600 text-white rounded font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        title={alreadyDone ? 'This promotion has already been completed for this single.' : (!meetsReq ? promo.reqText : (money < promo.cost ? 'Not enough money.' : 'Start Promotion'))}
                                     >
                                        {alreadyDone ? 'Completed' : 'Start Activity'}
                                    </button>
                                </div>
                                {!meetsReq && !alreadyDone && <p className="text-xs text-red-500 mt-1 font-semibold text-center">{promo.reqText}</p>}
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end mt-6">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                </div>
            </ModalWrapper>
        );
    };

    const SenbatsuPromotionResultModal = () => {
        if (!modalData) return null;

        const { promoType, singleName, members, totalFanGain, salesBoost, income, fansConverted, message } = modalData;

        const containerRef = useRef(null);

        // Kawaii particle effect
        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;
            const createParticle = (emoji, className) => {
                const particle = document.createElement('div');
                particle.innerHTML = emoji;
                particle.className = `particle-float ${className}`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.transform = `scale(${Math.random() + 0.5})`;
                particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            };
            const particleInterval = setInterval(() => {
                createParticle(Math.random() > 0.5 ? '✨' : '💖', 'text-xl');
            }, 150);
            return () => clearInterval(particleInterval);
        }, []);
        
        const promoDetails = {
            magazineCover:  { icon: '📸', color: 'pink', title: 'Magazine Cover Success!' },
            tvSpecial:      { icon: '📺', color: 'blue', title: 'TV Special Aired!' },
            radioUnit:      { icon: '📻', color: 'purple', title: 'On The Air!' },
            musicShow:      { icon: '🎤', color: 'teal', title: 'Amazing Performance!' },
            handshakeEvent: { icon: '🤝', color: 'rose', title: 'Handshake Event Success!' },
            productCM:      { icon: '🎬', color: 'amber', title: 'Commercial Deal!' },
            animeTieIn:     { icon: '🎌', color: 'indigo', title: 'Anime Tie-In!' },
            guerillaLive:   { icon: '🎸', color: 'red', title: 'Guerilla Live!' },
            cdShopTour:     { icon: '💿', color: 'cyan', title: 'CD Shop Tour!' },
            varietyShow:    { icon: '😂', color: 'lime', title: 'Variety Show Appearance!' },
            photobook:      { icon: '📖', color: 'violet', title: 'Photobook Released!' },
            karaoke:        { icon: '🎶', color: 'orange', title: 'Karaoke Takeover!' },
        };

        const currentPromo = promoDetails[promoType] || { icon: '🎉', color: 'gray', title: 'Promotion Complete!' };
        
        const colorClasses = {
            bg: `bg-${currentPromo.color}-100`,
            text: `text-${currentPromo.color}-800`,
            border: `border-${currentPromo.color}-300`,
            accent: `text-${currentPromo.color}-500`,
        };

        const StatDisplay = ({ icon, label, value, valueColor = 'text-gray-800 dark:text-white' }) => (
            <div className="flex justify-between items-center bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
                <span className="font-semibold flex items-center text-sm"><span className="mr-2 text-lg">{icon}</span>{label}:</span>
                <span className={`font-bold text-lg ${valueColor}`}>{value}</span>
            </div>
        );

        return (
            <ModalWrapper title="" maxWidth="max-w-md">
                <div ref={containerRef} className="relative w-full bg-gradient-to-br from-white/70 to-white/40 dark:from-gray-800/70 dark:to-gray-900/40 backdrop-blur-xl rounded-3xl overflow-hidden p-6 text-center border-2 border-white/50 dark:border-gray-700/50 shadow-2xl">
                    
                    <div className="absolute top-4 right-4 text-4xl animate-bounce">{currentPromo.icon}</div>

                    <h3 className={`text-3xl font-bold ${colorClasses.accent} mb-3 font-['Mochiy_Pop_One']`}>{currentPromo.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm px-4">{message}</p>
                    
                    <div className="space-y-3 my-6">
                        {totalFanGain > 0 && <StatDisplay icon="👥" label="New Fans" value={`+${totalFanGain.toLocaleString()}`} valueColor={`text-green-500`} />}
                        {income > 0 && <StatDisplay icon="💰" label="Income" value={`+¥${income.toLocaleString()}`} valueColor={`text-green-500`} />}
                        {fansConverted > 0 && <StatDisplay icon="💖" label="Fans Converted" value={`${fansConverted.toLocaleString()}`} valueColor={`text-pink-500`} />}
                        {salesBoost > 0 && <StatDisplay icon="📈" label="Sales Boost" value={`+${salesBoost}%`} valueColor={`text-blue-500`} />}
                    </div>

                    {members && members.length > 0 && (
                        <div className="mt-6">
                            <h4 className={`font-bold text-sm uppercase ${colorClasses.text} mb-3`}>Featured Members</h4>
                            <div className="flex justify-center flex-wrap gap-2">
                                {members.map(m => <span key={m.id} className={`text-xs ${colorClasses.bg} ${colorClasses.text} font-semibold px-3 py-1 rounded-full`}>{m.name}</span>)}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center mt-8">
                        <button onClick={() => setShowModal(null)} className={`bg-gradient-to-br from-${currentPromo.color}-400 to-${currentPromo.color}-600 hover:from-${currentPromo.color}-500 hover:to-${currentPromo.color}-700 active:scale-95 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-${currentPromo.color}-500/20 transition-all text-lg`}>
                            SUGOI!
                        </button>
                    </div>
                </div>
                <style jsx>{`
                    .particle-float { position: absolute; bottom: -20px; pointer-events: none; animation: floatUpAndFade 5s linear forwards; }
                    @keyframes floatUpAndFade { 
                        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(-400px) rotate(720deg); opacity: 0; } 
                    }
                    @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');
                    .font-\['Mochiy_Pop_One'\] { font-family: 'Mochiy Pop One', sans-serif; }
                `}</style>
            </ModalWrapper>
        );
    };


    const BsidePromotionModal = () => {
        if (!modalData || !modalData.single || !modalData.track) return null;

        const { single, track } = modalData;

        const bsidePromotions = [
            { id: 'fullMV', name: 'Full-Budget Music Video', cost: 400000, description: 'Fund a high-quality music video. A massive statement that provides a huge fan gain for the unit.' },
            { id: 'miniTour', name: 'Unit Mini-Tour', cost: 750000, description: 'The unit headlines their own small tour. Extremely expensive, but provides legendary hardcore fan conversion, skill boosts, and new fans.' },
            { id: 'performanceVideo', name: 'Special Performance Video', cost: 75000, description: 'Fund a well-shot performance video. Provides a significant fan gain based on unit skill.' },
            { id: 'varietySkit', name: 'Unit Variety Skit', cost: 15000, description: 'A short, funny online skit. Gains fans based on Variety skill and can even improve the skill.' },
            { id: 'fanMeeting', name: 'Unit Fan Meeting', cost: 25000, description: 'A classic fan meeting to convert casual fans to hardcore supporters. Effectiveness is based on Charisma.' },
            { id: 'gravurePhotoshoot', name: 'Gravure Photoshoot (Top 3)', cost: 20000, description: 'Features the top 3 visual members of the unit in a magazine. Provides a targeted fan gain.' },
            { id: 'acousticVideo', name: 'Acoustic Performance Video', cost: 4000, description: 'A stripped-down vocal performance. Great for converting fans if the unit has high singing skill.' },
            { id: 'selfieMV', name: 'Selfie MV / TikTok Challenge', cost: 5000, description: 'A fun, low-fi video for social media. Cheap, with a very small chance to go viral.' },
            { id: 'dancePractice', name: 'Dance Practice Video', cost: 2000, description: 'Release a dance practice video. A very cheap way to impress and convert fans based on Dance skill.' },
            { id: 'socialMediaTakeover', name: 'Social Media Takeover', cost: 0, description: 'The unit takes over the group\'s social media for a day. Free, and converts a small number of fans.' },
            { id: 'gamingStream', name: 'Sponsored Gaming Stream', cost: -10000, description: 'The unit plays a sponsored game on a livestream. Earns a small income and gains fans.' },
            { id: 'unitMerch', name: 'Limited Edition Unit Merch', cost: -20000, description: 'Sell limited-run merchandise for the unit. Generates income based on the unit\'s popularity.' },
        ].sort((a,b) => a.cost - b.cost);

        return (
            <ModalWrapper title={`Promote B-Side Unit: ${track.unitName}`} maxWidth="max-w-3xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose a promotional activity for the '{track.name}' unit. Some promotions can be done only once.</p>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {bsidePromotions.map(promo => {
                        const alreadyDone = (completedBsidePromos[single.id]?.[track.name] || []).includes(promo.id);
                        return (
                            <div key={promo.id} className={`p-4 border rounded-lg ${!alreadyDone ? 'bg-white dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-700 opacity-60'}`}>
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-lg">{promo.name}</h4>
                                    <span className={`font-bold ${promo.cost > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {promo.cost > 0 ? `Cost: ¥${promo.cost.toLocaleString()}` : `Income: ¥${(-promo.cost).toLocaleString()}`}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 my-1">{promo.description}</p>
                                <div className="flex justify-end items-center mt-2">
                                    <button
                                        onClick={() => startBsidePromotion(promo.id, single.id, track.name)}
                                        disabled={money < promo.cost || alreadyDone}
                                        className="px-4 py-2 bg-purple-600 text-white rounded font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
                                        title={alreadyDone ? 'This promotion is already complete for this unit.' : (money < promo.cost ? 'Not enough money.' : 'Start Promotion')}
                                    >
                                        {alreadyDone ? 'Completed' : 'Start'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </ModalWrapper>
        );
    };

    const BsidePromotionResultModal = () => {
        if (!modalData) return null;

        const { promoType, unitName, trackName, fanGain, convertedFans, income, message } = modalData;

        const containerRef = useRef(null);

        // Kawaii particle effect
        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;
            const createParticle = (emoji, className) => {
                const particle = document.createElement('div');
                particle.innerHTML = emoji;
                particle.className = `particle-float ${className}`;
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.transform = `scale(${Math.random() + 0.5})`;
                particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
                container.appendChild(particle);
                setTimeout(() => particle.remove(), 5000);
            };
            const particleInterval = setInterval(() => {
                createParticle(Math.random() > 0.5 ? '✨' : '💖', 'text-xl');
            }, 150);
            return () => clearInterval(particleInterval);
        }, []);

        const StatDisplay = ({ icon, label, value, valueColor = 'text-white' }) => (
            <div className="flex justify-between items-center bg-black/10 p-3 rounded-lg">
                <span className="font-semibold flex items-center text-sm"><span className="mr-2 text-lg">{icon}</span>{label}:</span>
                <span className={`font-bold text-lg ${valueColor}`}>{value}</span>
            </div>
        );

        return (
            <ModalWrapper title="" maxWidth="max-w-md">
                <div ref={containerRef} className="relative w-full bg-gradient-to-br from-pink-400/70 to-purple-500/50 backdrop-blur-xl rounded-3xl overflow-hidden p-6 text-center border-2 border-white/50 shadow-2xl text-white">
                    
                    <div className="absolute top-4 right-4 text-4xl animate-bounce">🎶</div>

                    <h3 className="text-3xl font-bold text-white mb-3 font-['Mochiy_Pop_One']" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.4)' }}>
                        {unitName || 'Unit'} Promotion!
                    </h3>
                    <p className="text-white/80 mb-6 text-sm px-4">{message}</p>
                    
                    <div className="space-y-3 my-6">
                        {fanGain > 0 && <StatDisplay icon="👥" label="New Fans" value={`+${fanGain.toLocaleString()}`} valueColor={`text-cyan-300`} />}
                        {income > 0 && <StatDisplay icon="💰" label="Income" value={`+¥${income.toLocaleString()}`} valueColor={`text-lime-300`} />}
                        {convertedFans > 0 && <StatDisplay icon="💖" label="Hardcore Fans" value={`+${convertedFans.toLocaleString()}`} valueColor={`text-red-300`} />}
                    </div>

                    <div className="flex justify-center mt-8">
                        <button onClick={() => setShowModal(null)} className="bg-gradient-to-br from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 active:scale-95 text-white px-10 py-3 rounded-full font-bold shadow-lg shadow-pink-500/30 transition-all text-lg border-2 border-white/50">
                            GANBATTA!
                        </button>
                    </div>
                </div>
                {/* Same style as Senbatsu Result Modal for particles */}
                <style jsx>{`
                    .particle-float { position: absolute; bottom: -20px; pointer-events: none; animation: floatUpAndFade 5s linear forwards; }
                    @keyframes floatUpAndFade { 
                        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                        100% { transform: translateY(-400px) rotate(720deg); opacity: 0; } 
                    }
                    @import url('https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap');
                    .font-\['Mochiy_Pop_One'\] { font-family: 'Mochiy Pop One', sans-serif; }
                `}</style>
            </ModalWrapper>
        );
    };


    const JankenTournamentModal = () => {
    if (!jankenTournament) return null;

    const { stage, blocks, finalBracket, round, blockWinners, isFinished, roundResults } = jankenTournament;

    // --- NEW: Hand Icons ---
    const HandIcon = ({ hand, size = 16 }) => {
        if (hand === 'rock') return <Hand size={size} className="text-gray-500" />;
        if (hand === 'paper') return <FileText size={size} className="text-gray-500" />;
        if (hand === 'scissors') return <Scissors size={size} className="text-gray-500" />;
        return null;
    };

    const Matchup = ({ pair }) => {
        const getMemberResult = (member) => {
            if (!roundResults || !member) return null;
            for (const outcome of roundResults) {
                const result = outcome.results.find(r => r.member.id === member.id);
                if (result) {
                    const isWinner = outcome.winner.id === member.id;
                    return { ...result, isWinner };
                }
            }
            return null;
        };

        const MemberCard = ({ member }) => {
            if (!member) {
                return <div className="p-3 text-center text-gray-500 italic">TBD</div>;
            }
            const team = teams.find(t => t.id === member.teamId);
            const result = getMemberResult(member);
            const cardClasses = result 
                ? (result.isWinner ? 'bg-green-100 dark:bg-green-900 border-green-400' : 'bg-red-50 dark:bg-red-900/50 opacity-60')
                : 'bg-gray-50/80 dark:bg-gray-700/80';

            return (
                <div className={`p-2.5 text-center border-b dark:border-gray-600/80 ${cardClasses} transition-all duration-500`}>
                    <div className="flex justify-between items-center">
                        <div className="flex-1 text-left">
                            <p className="font-bold text-sm truncate" title={member.name}>{member.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                {team?.name || 'No Team'} - Gen {member.generation}
                            </p>
                        </div>
                        {result && <HandIcon hand={result.hand} />}
                    </div>
                </div>
            )
        };
        
        return (
            <div className="relative my-1.5 text-center border border-gray-300/80 dark:border-gray-600/80 rounded-md overflow-hidden">
                {pair.map((member, index) => (
                    <MemberCard key={member?.id || `tbd-${index}`} member={member} />
                ))}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                    VS
                </div>
            </div>
        );
    };
    
    const WinnerDisplay = ({ member }) => {
         const team = teams.find(t => t.id === member.teamId);
         return (
             <div className="p-4 bg-yellow-100/80 dark:bg-yellow-900/80 backdrop-blur-sm border-2 border-yellow-400 dark:border-yellow-600 rounded-lg text-center">
                <Trophy size={20} className="mx-auto text-yellow-600 dark:text-yellow-400" />
                <p className="font-bold text-lg text-yellow-800 dark:text-yellow-200">{member.name}</p>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    {team?.name || 'No Team'} - Gen {member.generation}
                </p>
            </div>
        );
    };

    const getBlockRoundName = (blockName) => {
        const bracket = blocks[blockName];
        if (!bracket || bracket.length === 0) return 'Finished';
        const numPairs = bracket.reduce((acc, curr) => acc + (curr.length > 0 ? 1 : 0), 0);
        if (numPairs === 1) return 'Final';
        return `Round ${round}`;
    }

    return (
        <ModalWrapper title="Janken Tournament" maxWidth="max-w-7xl">
            <style>{`
                .janken-crowd-glow::before {
                    content:""; position:absolute; inset:-80px;
                    background: radial-gradient(320px 200px at 15% 30%, rgba(120,84,255,.12), transparent 70%),
                                radial-gradient(340px 200px at 80% 25%, rgba(0,255,198,.1), transparent 70%),
                                radial-gradient(400px 260px at 55% 70%, rgba(255,62,128,.09), transparent 75%);
                    filter: blur(25px); opacity: .7;
                }
                .dark .janken-crowd-glow::before {
                    opacity: 1;
                    background: radial-gradient(220px 160px at 15% 30%, rgba(120,84,255,.28), transparent 60%),
                                radial-gradient(240px 160px at 80% 25%, rgba(0,255,198,.22), transparent 62%),
                                radial-gradient(300px 200px at 60% 65%, rgba(255,62,128,.18), transparent 65%);
                }
            `}</style>
            <div className="relative overflow-hidden p-4 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="absolute top-0 left-0 right-0 bottom-0 janken-crowd-glow"></div>
                <div className="relative">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold uppercase tracking-wider">{stage === 'blocks' ? 'Block Rounds' : 'Final Tournament'}</h2>
                        {stage === 'finals' && <p className="text-lg font-semibold">Round {round}</p>}
                    </div>

                    {stage === 'blocks' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {['A', 'B', 'C', 'D'].map(blockName => (
                                <div key={blockName} className="p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200/80 dark:border-gray-700/80">
                                    <h3 className="text-xl font-bold text-center border-b-2 pb-2 mb-2">Block {blockName} <span className="text-base font-medium">({getBlockRoundName(blockName)})</span></h3>
                                    {blockWinners[blockName] ? (
                                        <WinnerDisplay member={blockWinners[blockName]} />
                                    ) : (
                                        blocks[blockName]?.map((pair, index) => <Matchup key={index} pair={pair} />)
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {stage === 'finals' && (
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <h3 className="text-xl font-bold text-center mb-2 md:col-span-2">Final Bracket</h3>
                            {finalBracket.map((pair, index) => <Matchup key={index} pair={pair} />)}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={() => setShowModal(null)} className="py-2 px-4 bg-gray-700/80 text-white font-semibold rounded-lg hover:bg-gray-700 backdrop-blur-sm">
                            Close
                        </button>
                        {!isFinished && (
                            <>
                                {roundResults ? (
                                    <button onClick={advanceJankenRound} className="py-2 px-6 bg-green-600/80 text-white font-bold rounded-lg hover:bg-green-700 shadow-lg backdrop-blur-sm">
                                        Continue to Next Round
                                    </button>
                                ) : (
                                    <button onClick={simulateJankenRound} className="py-2 px-6 bg-blue-600/80 text-white font-bold rounded-lg hover:bg-blue-700 animate-pulse shadow-lg backdrop-blur-sm">
                                        Simulate Round
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

const ShuffleHistoryViewer = ({ data }) => {
    if (!data) return null;

    // Helper function to group members by a category, needed for Kennin members.
    const groupByCategory = (members, categoryKey) => {
        if (!members) return {};
        return members.reduce((acc, item) => {
            const key = item[categoryKey];
            if (!acc[key]) acc[key] = [];
            acc[key].push(item.memberName);
            return acc;
        }, {});
    };

    return (
        <div className="mt-2 space-y-4 rounded-lg border dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/50">
            {Object.values(data).map((teamData) => {
                // Group shuffled-in members by their "from" location.
                const groupedShuffledIn = (teamData.shuffledIn || []).reduce((acc, move) => {
                    const key = move.fromTeam;
                    if (!acc[key]) acc[key] = [];
                    acc[key].push(move); // Push the whole move object
                    return acc;
                }, {});

                // Group Kennin members by their original group.
                const kenninFromGroups = groupByCategory(teamData.kenninIn, 'fromGroup');

                // Update the content check to include Kennin members.
                const hasContent = (teamData.retained?.length || 0) > 0 || (teamData.shuffledIn?.length || 0) > 0 || (teamData.kenninIn?.length || 0) > 0;
                if (!hasContent) return null;

                return (
                    <div key={teamData.id} className="p-2">
                        <h4 className="text-md font-semibold text-pink-500">{teamData.groupName} - {teamData.name}</h4>
                        
                        {teamData.retained.length > 0 && (
                            <div className="mb-2">
                                <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">Original Members</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{teamData.retained.map(m => m.memberName).join(', ')}</p>
                            </div>
                        )}

                        {Object.entries(groupedShuffledIn).map(([fromTeam, moves]) => {
                            const moveType = moves[0]?.moveType;
                            const colorClass = 
                                moveType === 'transfer' ? 'text-purple-500' :
                                moveType === 'promotion' ? 'text-red-500' :
                                'text-blue-500';
                            const memberNames = moves.map(m => m.memberName).join(', ');

                            return (
                                <div key={fromTeam} className="mb-2">
                                    <p className={`font-semibold text-xs ${colorClass}`}>From {fromTeam}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{memberNames}</p>
                                </div>
                            );
                        })}

                        {/* Add the rendering logic for Kennin members. */}
                        {Object.entries(kenninFromGroups).map(([fromGroup, members]) => (
                            <div key={fromGroup} className="mb-2">
                                <p className="font-semibold text-xs text-yellow-500">Concurrent Position from {fromGroup}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{members.join(', ')}</p>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
};


const HistoryDetailModal = () => {
    if (!modalData) return null;

    const { type, week } = modalData;
    const history = modalData;
    let title = '';
    let content = null;

if (type === 'election') {
        title = `General Election #${electionHistory.findIndex(e => e.week === week) + 1}`;

        const getMemberStatusString = (member) => {
            if (!member) return '...';
    
            // 1. Determine Primary Assignment from historical data
            let primaryGroup;
            if (member.isRivalKennin || member.isExchangeStudent) {
                primaryGroup = member.homeGroup;
            } else {
                primaryGroup = member.displayGroupName || groupName;
            }
            const primaryTeam = member.teamName ? `Team ${member.teamName}` : 'Kenkyuusei';
            const primaryPart = `${primaryGroup} | ${primaryTeam}`;
    
            // 2. Collect all Concurrent Assignments from historical data
            const kenninParts = [];
            if (member.kennin && member.kennin.teamName) {
                const kenninGroupName = member.kennin.groupId === 'main' 
                    ? groupName 
                    : (sisterGroups.find(sg => String(sg.id) === String(member.kennin.groupId))?.name || 'Unknown');
                const partString = `${kenninGroupName} Team ${member.kennin.teamName}`;
                if (!kenninParts.includes(partString)) kenninParts.push(partString);
            }
            if (member.kenninGroups && member.kenninGroups.length > 0) {
                member.kenninGroups.forEach(kgName => {
                    if (!kenninParts.some(part => part.includes(kgName))) {
                        kenninParts.push(kgName);
                    }
                });
            }
            if (member.rivalKennin) {
                if (!kenninParts.includes(member.rivalKennin.rivalName)) {
                    kenninParts.push(member.rivalKennin.rivalName);
                }
            }
            if ((member.isRivalKennin || member.isExchangeStudent) && member.kenninInfo) {
                if (!kenninParts.includes(member.kenninInfo.groupName)) {
                    kenninParts.push(member.kenninInfo.groupName);
                }
            }
    
            // 3. Assemble the final, unified string
            let finalString;
            if (kenninParts.length > 0) {
                finalString = `${primaryPart.replace(' | ', ' ')} / ${kenninParts.join(' / ')}`;
            } else {
                finalString = primaryPart;
            }
            
            // 4. Append generation
            if (member.generation) {
                finalString += ` | ${member.generation}`;
            }
    
            return finalString;
        };

        const RankChangeArrow = ({ member, electionWeek }) => {
            if (!member) return null;
            const oldRank = member.previousRank;
            const newRank = member.rank;

            const hadRankingsBeforeThisElection = (member.electionHistory || []).some(entry => entry.week < electionWeek);

            if (oldRank === 999 || !oldRank) {
                if (hadRankingsBeforeThisElection) {
                    return <span className="text-purple-500 font-bold text-center">Re-Entry</span>;
                } else {
                    return <span className="text-cyan-500 font-bold text-center">New Entry</span>;
                }
            }
            if (newRank < oldRank) return <span className="text-green-400 font-bold flex items-center justify-center"><ChevronUp size={16} />{oldRank - newRank}</span>;
            if (newRank > oldRank) return <span className="text-red-400 font-bold flex items-center justify-center"><ChevronDown size={16} />{newRank - oldRank}</span>;
            return <span className="text-gray-400 font-bold text-center">-</span>;
        };

        const allUnits = {
            'Senbatsu': { min: 1, max: 16, members: [], color: 'from-pink-400 to-red-400' },
            'Undergirls': { min: 17, max: 32, members: [], color: 'from-blue-400 to-sky-500' },
            'Next Girls': { min: 33, max: 48, members: [], color: 'from-green-400 to-emerald-500' },
            'Future Girls': { min: 49, max: 64, members: [], color: 'from-purple-400 to-violet-500' },
            'Upcoming Girls': { min: 65, max: 80, members: [], color: 'from-orange-400 to-red-500' },
        };
    
        const spots = history.spots || 80;
        const units = Object.entries(allUnits).reduce((acc, [name, data]) => {
            if (data.min <= spots) {
                acc[name] = { ...data, max: Math.min(data.max, spots) };
            }
            return acc;
        }, {});
        
        const unrankedMembers = [];

        if (history.results) {
            [...history.results].sort((a, b) => a.rank - b.rank).forEach(member => {
                const unit = Object.values(units).find(u => member.rank >= u.min && member.rank <= u.max);
                if (unit) {
                    unit.members.push(member);
                } else if (member.rank > spots) {
                    unrankedMembers.push(member);
                }
            });
        }

        const UnitSection = ({ name, data, isUnranked = false }) => {
            if (data.members.length === 0) return null;
            const title = isUnranked ? `${name} (Ranks ${data.min}+)` : `${name} (Ranks ${data.min}-${data.max})`;
            
            return (
                <div className="mb-4">
                    <h2 className={`text-lg font-bold p-2 bg-gradient-to-r ${data.color} text-white rounded-t-lg shadow-md`}>
                        {title}
                    </h2>
                    <div className="bg-white/70 dark:bg-slate-900/70 rounded-b-lg shadow-md">
                        <div className="grid grid-cols-12 gap-2 items-center p-2 font-bold text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-slate-800 border-b dark:border-slate-700">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-7">Member</div>
                            <div className="col-span-1 text-center">Change</div>
                            <div className="col-span-3 text-right">Votes</div>
                        </div>
                        {data.members.map(member => (
                            <div key={`${member.rank}-${member.rosterId || member.id}`} className="grid grid-cols-12 gap-2 items-center p-2 border-b dark:border-slate-700 last:border-b-0">
                                <div className="col-span-1 text-center font-bold text-pink-600 dark:text-pink-400">#{member.rank}</div>
                                        <div className="col-span-7">
                                            <p className="font-semibold text-sm text-gray-800 dark:text-gray-200">{member.name}</p>
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate" title={getMemberStatusString(member)}>{getMemberStatusString(member)}</p>
                                        </div>
                                <div className="col-span-1 text-center text-[13px]">
                                    <RankChangeArrow member={member} electionWeek={history.week} />
                                </div>
                                <div className="col-span-3 text-right font-mono text-[14px] text-blue-600 dark:text-blue-400">{member.votes.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        content = (
            <div className="max-h-[70vh] overflow-y-auto p-1">
                {Object.entries(units).map(([name, data]) => <UnitSection key={name} name={name} data={data} />)}

                {unrankedMembers.length > 0 && (
                     <UnitSection
                         key="unranked"
                         name="Unranked"
                         isUnranked={true}
                         data={{
                             members: unrankedMembers,
                             color: 'from-slate-400 to-slate-500',
                             min: spots + 1,
                         }}
                     />
                )}
                
                {history.trivia && history.trivia.length > 0 && (
                    <div className="mt-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-lg shadow-inner">
                        <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-200">Election Trivia</h3>
                        <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                            {history.trivia.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                )}
            </div>
        );

    } else if (type === 'janken') {
        title = `Janken Tournament #${jankenHistory.findIndex(j => j.week === week) + 1}`;
        
        const MemberRow = ({ member, isSenbatsu = false }) => (
            <div className="py-2 px-3 grid grid-cols-12 gap-2 items-center border-b border-gray-200 dark:border-gray-700">
                <div className="col-span-1 font-bold text-center">{isSenbatsu ? `#${member.rank}` : '-'}</div>
                <div className="col-span-4 font-semibold">{member.name}</div>
                <div className="col-span-3 text-sm text-gray-600 dark:text-gray-400">{member.eliminationRound}</div>
                <div className="col-span-4 text-sm text-gray-600 dark:text-gray-400">
                    {member.lostTo ? (
                        <span><span className="text-red-500">Lost to:</span> {member.lostTo}</span>
                    ) : (
                        <span className="text-green-500 font-semibold">Tournament Winner</span>
                    )}
                </div>
            </div>
        );

        const { senbatsu, unplaced } = history;

        content = (
            <div className="p-1 bg-gray-50 dark:bg-gray-800 max-h-[70vh] overflow-y-auto">
                <div className="mb-6">
                    <h2 className="text-xl font-bold p-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-t-lg">
                        Senbatsu (Top 16)
                    </h2>
                    <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-md">
                        <div className="py-2 px-3 grid grid-cols-12 gap-2 font-semibold text-sm bg-gray-100 dark:bg-gray-700">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Member</div>
                            <div className="col-span-3">Elimination Round</div>
                            <div className="col-span-4">Details</div>
                        </div>
                        {senbatsu && senbatsu.map((member) => ( <MemberRow key={member.rosterId} member={member} isSenbatsu={true} /> ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold p-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-t-lg">
                        Unplaced Members
                    </h2>
                     <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-md">
                        <div className="py-2 px-3 grid grid-cols-12 gap-2 font-semibold text-sm bg-gray-100 dark:bg-gray-700">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Member</div>
                            <div className="col-span-3">Elimination Round</div>
                            <div className="col-span-4">Details</div>
                        </div>
                        {unplaced && unplaced.map((member) => ( <MemberRow key={member.rosterId} member={member} /> ))}
                    </div>
                </div>
            </div>
        );
    } else if (type === 'Grand Shuffle') {
        title = `Grand Shuffle`;
        content = <ShuffleHistoryViewer data={history.data} />;
    }

    return (
        <ModalWrapper title={`${title} (Week ${week})`} maxWidth="max-w-4xl">
            <div className="p-1">
                {content}
                <button onClick={() => setShowModal(null)} className="mt-6 w-full p-2 bg-gradient-to-r from-pink-400 to-blue-500 text-white font-bold rounded-lg hover:from-pink-500 hover:to-blue-600">
                    Close
                </button>
            </div>
        </ModalWrapper>
    );
};

const JankenResultModal = () => {
    if (!modalData) return null;

    const { senbatsu, unplaced } = modalData;

    const MemberRow = ({ member, isSenbatsu = false }) => (
        <div className="py-2 px-3 grid grid-cols-12 gap-2 items-center border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-1 font-bold text-center">{isSenbatsu ? `#${member.rank}` : '-'}</div>
            <div className="col-span-4 font-semibold">{member.name}</div>
            <div className="col-span-3 text-sm text-gray-600 dark:text-gray-400">{member.eliminationRound}</div>
            <div className="col-span-4 text-sm text-gray-600 dark:text-gray-400">
                {member.lostTo ? (
                    <span>
                        <span className="text-red-500">Lost to:</span> {member.lostTo}
                    </span>
                ) : (
                    <span className="text-green-500 font-semibold">Tournament Winner</span>
                )}
            </div>
        </div>
    );

    return (
        <ModalWrapper title="Janken Tournament Results" maxWidth="max-w-4xl">
            <div className="p-1 bg-gray-50 dark:bg-gray-800">
                
                {/* --- Senbatsu --- */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold p-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-t-lg">
                        Senbatsu (Top 16)
                    </h2>
                    <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-md">
                        <div className="py-2 px-3 grid grid-cols-12 gap-2 font-semibold text-sm bg-gray-100 dark:bg-gray-700">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Member</div>
                            <div className="col-span-3">Elimination Round</div>
                            <div className="col-span-4">Details</div>
                        </div>
                        {senbatsu && senbatsu.map((member) => (
                            <MemberRow key={member.rosterId} member={member} isSenbatsu={true} />
                        ))}
                    </div>
                </div>

                {/* --- Unplaced --- */}
                <div>
                    <h2 className="text-xl font-bold p-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-t-lg">
                        Unplaced Members
                    </h2>
                     <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-md">
                        <div className="py-2 px-3 grid grid-cols-12 gap-2 font-semibold text-sm bg-gray-100 dark:bg-gray-700">
                            <div className="col-span-1 text-center">Rank</div>
                            <div className="col-span-4">Member</div>
                            <div className="col-span-3">Elimination Round</div>
                            <div className="col-span-4">Details</div>
                        </div>
                        {unplaced && unplaced.map((member) => (
                            <MemberRow key={member.rosterId} member={member} />
                        ))}
                    </div>
                </div>

            </div>
        </ModalWrapper>
    );
};

const KouhakuInvitationModal = () => {
    const cost = 5000000;
    const canAfford = money >= cost;

    const handleAccept = () => {
        if (canAfford) {
            acceptKouhakuInvitation();
        } else {
            setMessage(`You cannot afford the ¥${cost.toLocaleString()} participation fee.`);
        }
    };

    const handleDecline = () => {
        declineKouhakuInvitation();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-lg rounded-2xl bg-gradient-to-b from-red-800 to-red-900 border-2 border-yellow-400 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 text-white">
                <div className="p-6 text-center">
                    <Trophy size={48} className="mx-auto text-yellow-300 mb-4" />
                    <h2 className="text-3xl font-bold mb-2">You're Invited!</h2>
                    <h3 className="text-xl font-semibold text-yellow-200 mb-4">Kouhaku Uta Gassen</h3>
                    <p className="text-gray-200 mb-6">
                        Your group's phenomenal success this year has earned them a coveted invitation to the nation's most prestigious year-end music festival. This is a huge opportunity for growth and prestige.
                    </p>
                    <div className="p-4 bg-black bg-opacity-30 rounded-lg">
                        <p className="text-lg font-bold text-red-300">Participation Fee: ¥{cost.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">This covers production, outfits, and other expenses.</p>
                    </div>
                </div>
                <div className="grid grid-cols-2">
                    <button onClick={handleDecline} className="p-4 bg-gray-700 hover:bg-gray-600 font-bold text-lg transition-colors">
                        Decline
                    </button>
                    <button onClick={handleAccept} disabled={!canAfford} className="p-4 bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold text-lg transition-colors disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed">
                        {canAfford ? 'Accept' : 'Not Enough Money'}
                    </button>
                </div>
            </div>
        </div>
    );
};
    const KouhakuPreparationModal = () => {
        // --- STATE ---
        const [selectedSongId, setSelectedSongId] = useState(null);
        const [selectedMemberIds, setSelectedMemberIds] = useState([]);
        const [memberFilter, setMemberFilter] = useState('all');

        // --- DATA DERIVATION ---
        const allSingles = [...songs, ...sisterGroups.flatMap(sg => sg.songs || [])].filter(s => s.type === 'single');
        const yearStartWeek = Math.floor((week - 1) / 52) * 52 + 1;
        const eligibleSingles = allSingles.filter(s => s.releaseWeek >= yearStartWeek).sort((a, b) => (b.totalSales || 0) - (a.totalSales || 0));

        const selectedSong = eligibleSingles.find(s => s.id === selectedSongId);
        
        // --- THIS IS THE KEY CHANGE ---
        // The pool of available members is now ALL available members from ALL groups,
        // as long as a song has been selected.
        const availableMembers = selectedSong ? getAllAvailableMembers(true) : [];
        // --- END OF KEY CHANGE ---

        // --- FILTERING LOGIC (Now operates on the full group list) ---
        const mainGroupGenerations = [...new Set(availableMembers.filter(m => !m.isSisterMember).map(m => m.generation).filter(Boolean))];
        const sisterGroupDetails = sisterGroups.map(sg => ({
            ...sg,
            generations: [...new Set(availableMembers.filter(m => String(m.groupId) === String(sg.id)).map(m => m.generation).filter(Boolean))]
        }));

        let filteredMembers = availableMembers;
        if (memberFilter !== 'all') {
            if (memberFilter.startsWith('team-')) {
                const teamId = parseInt(memberFilter.replace('team-', ''), 10);
                const selectedTeam = teams.find(t => t.id === teamId);
                if (selectedTeam) {
                    const teamMemberIds = new Set(selectedTeam.members.map(String));
                    filteredMembers = availableMembers.filter(member => teamMemberIds.has(String(member.rosterId || member.id)));
                } else {
                    filteredMembers = [];
                }
            } else if (memberFilter === 'main') {
                filteredMembers = availableMembers.filter(m => !m.isSisterMember);
            } else if (memberFilter.startsWith('main-gen-')) {
                const gen = memberFilter.replace('main-gen-', '');
                filteredMembers = availableMembers.filter(m => !m.isSisterMember && m.generation === gen);
            } else if (memberFilter.startsWith('sg-')) {
                if (memberFilter.includes('-gen-')) {
                    const [sgIdStr, gen] = memberFilter.replace('sg-', '').split('-gen-');
                    filteredMembers = availableMembers.filter(m => String(m.groupId) === sgIdStr && m.generation === gen);
                } else {
                    const sgId = memberFilter.replace('sg-', '');
                    filteredMembers = availableMembers.filter(m => String(m.groupId) === sgId);
                }
            }
        }

        // --- HANDLERS ---
        const handleSongSelect = (songId) => {
            setSelectedSongId(songId);
            const song = eligibleSingles.find(s => s.id === songId);
            const titleTrack = song?.tracks.find(t => t.type === 'title');
            // Default selection is still the original senbatsu
            const memberIds = titleTrack?.members?.map(m => m.id) || [];
            setSelectedMemberIds(memberIds);
            setMemberFilter('all');
        };

        const toggleMember = (memberId) => {
            setSelectedMemberIds(prev => prev.includes(memberId) ? prev.filter(id => id !== memberId) : [...prev, memberId]);
        };

        const selectAllFiltered = () => setSelectedMemberIds(prev => [...new Set([...prev, ...filteredMembers.map(m => m.id)])]);

        const deselectAllFiltered = () => {
            const filteredIds = new Set(filteredMembers.map(m => m.id));
            setSelectedMemberIds(prev => prev.filter(id => !filteredIds.has(id)));
        };

        const handleConfirm = () => {
            confirmKouhakuParticipation(selectedSongId, selectedMemberIds);
        };

        // --- RENDER ---
        return (
            <ModalWrapper title="Kouhaku Performance Preparation" maxWidth="max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold mb-2">1. Select Representative Song</h4>
                        <div className="space-y-2 max-h-96 overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-900">
                            {eligibleSingles.map(song => (
                                <label key={song.id} className={`block p-3 rounded-lg border cursor-pointer ${selectedSongId === song.id ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : 'bg-white dark:bg-gray-800'}`}>
                                    <input type="radio" name="kouhaku-song" checked={selectedSongId === song.id} onChange={() => handleSongSelect(song.id)} className="mr-2"/>
                                    <span className="font-semibold">{song.name}</span>
                                    <span className="text-xs text-gray-500 block">Total Sales: {(song.totalSales || 0).toLocaleString()}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">2. Confirm Performing Members ({selectedMemberIds.length})</h4>
                        
                        <div className="mb-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="kouhaku-member-filter" className="text-sm font-medium dark:text-gray-300">Filter:</label>
                                <select id="kouhaku-member-filter" value={memberFilter} onChange={e => setMemberFilter(e.target.value)} className="p-1 rounded border-gray-300 dark:bg-gray-700 dark:border-gray-600 text-xs">
                                    <option value="all">All Available</option>
                                    <optgroup label="Teams">
                                        {(teams || []).map(team => (<option key={`team-${team.id}`} value={`team-${team.id}`}>{team.name}</option>)) }
                                    </optgroup>
                                    <optgroup label="Groups">
                                        <option value="main">{groupName}</option>
                                        {sisterGroups.map(sg => (<option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name}</option>))}
                                    </optgroup>
                                    {mainGroupGenerations.length > 0 && <optgroup label={`${groupName} Gen`}>{mainGroupGenerations.map(gen => (<option key={`main-gen-${gen}`} value={`main-gen-${gen}`}>{gen}</option>))}</optgroup>}
                                    {sisterGroupDetails.map(sg => (sg.generations.length > 0 && (<optgroup key={`sg-gen-group-${sg.id}`} label={`${sg.name} Gen`}>{sg.generations.map(gen => (<option key={`sg-${sg.id}-gen-${gen}`} value={`sg-${sg.id}-gen-${gen}`}>{gen}</option>))}</optgroup>)))}
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={selectAllFiltered} className="flex-1 px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700">Select Filtered</button>
                                <button onClick={deselectAllFiltered} className="flex-1 px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500">Deselect Filtered</button>
                            </div>
                        </div>

                        <div className="space-y-1 max-h-[330px] overflow-y-auto p-2 border rounded bg-gray-50 dark:bg-gray-900">
                            {filteredMembers.map(member => (
                                <label key={member.rosterId || member.id} className={`flex items-center justify-between p-2 rounded-lg cursor-pointer ${selectedMemberIds.includes(member.id) ? 'bg-green-100 dark:bg-green-900' : 'bg-white dark:bg-gray-800'}`}>
                                    <span>{member.name}</span>
                                    <input type="checkbox" checked={selectedMemberIds.includes(member.id)} onChange={() => toggleMember(member.id)} />
                                </label>
                            ))}
                            {!selectedSong && <p className="text-center text-gray-500 p-4">Select a song to see the member list.</p>}
                            {selectedSong && filteredMembers.length === 0 && <p className="text-center text-gray-500 p-4">No members match the current filter.</p>}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
                    <button onClick={handleConfirm} disabled={!selectedSong || selectedMemberIds.length === 0} className="p-3 bg-red-600 text-white rounded font-bold disabled:bg-gray-400">
                        Confirm Lineup & Pay Fee (¥5,000,000)
                    </button>
                </div>
            </ModalWrapper>
        );
    };

const KouhakuResultModal = () => {
    if (!modalData) return null;
    const { songName, fanGain, performers } = modalData;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-b from-red-600 to-red-800 border-2 border-yellow-300 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 text-white">
                <div className="p-4 flex justify-between items-center bg-black bg-opacity-20">
                    <div className="flex items-center gap-3">
                        <Trophy size={24} className="text-yellow-300" />
                        <h3 className="font-bold text-2xl text-white">Kouhaku Performance Success!</h3>
                    </div>
                    <button onClick={() => setShowModal(null)} className="w-9 h-9 rounded-full bg-white bg-opacity-10 text-white flex items-center justify-center hover:bg-opacity-20 transition-colors">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-8 text-center">
                    <p className="text-lg mb-2">The group delivered a stunning performance of</p>
                    <h2 className="text-4xl font-bold text-yellow-200 mb-6">"{songName}"</h2>
                    
                    <div className="bg-black bg-opacity-25 p-6 rounded-xl">
                        <p className="text-5xl font-bold text-cyan-300">+{fanGain.toLocaleString()}</p>
                        <p className="text-lg text-gray-200 font-semibold">New Fans Gained!</p>
                    </div>

                    <div className="mt-6">
                        <p className="font-semibold mb-2 text-gray-300">Performing Members:</p>
                        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-yellow-100 max-h-24 overflow-y-auto p-2 bg-black bg-opacity-20 rounded-lg">
                            {(performers || []).map(p => <span key={p.rosterId || p.id}>{p.name}</span>)}
                        </div>
                    </div>
                </div>
                 <div className="p-4 bg-black bg-opacity-20">
                    <button onClick={() => setShowModal(null)} className="w-full p-3 bg-yellow-400 text-red-800 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors">
                        Amazing!
                    </button>
                </div>
            </div>
        </div>
    );
};


const RequestHourVotingModal = () => {
    const allSongs = [
        ...songs.flatMap(s => (s.tracks || []).map(t => ({...t, id: `${s.id}-${t.name}`, artist: s.artist || s.targetGroup, singleName: s.name}))),
        ...sisterGroups.flatMap(sg => (sg.songs || []).flatMap(s => (s.tracks || []).map(t => ({...t, id: `sg-${sg.id}-${s.id}-${t.name}`, artist: sg.name, singleName: s.name})))),
        ...theaterSongs.map(ts => ({...ts, id: `theater-${ts.id}`, artist: groupName, singleName: "Theater Stage"}))
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [voteAmount, setVoteAmount] = useState('1');

    const filteredSongs = allSongs.filter(song => 
        song.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        song.artist.toLowerCase().includes(searchTerm.toLowerCase())
    ).sort((a,b) => (requestHourStatus.votes[b.id] || 0) - (requestHourStatus.votes[a.id] || 0));

    return (
        <ModalWrapper title="Request Hour - Cast Votes" maxWidth="max-w-4xl">
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-center">
                    <p className="font-bold text-xl text-blue-800 dark:text-blue-200">¥{money.toLocaleString()}</p>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">Your Money</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg text-center">
                    <p className="font-bold text-xl text-green-800 dark:text-green-200">{votingTickets.toLocaleString()}</p>
                    <p className="text-xs font-semibold text-green-600 dark:text-green-400">Voting Tickets</p>
                </div>
                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg text-center">
                    <p className="font-bold text-xl text-red-800 dark:text-red-200">{requestHourStatus.endWeek - week} Weeks</p>
                    <p className="text-xs font-semibold text-red-600 dark:text-red-400">Voting Ends</p>
                </div>
            </div>

            <input 
                type="text"
                placeholder="Search for a song or artist..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded mb-3 bg-white dark:bg-gray-700"
            />

            <div className="max-h-96 overflow-y-auto border rounded p-2 bg-gray-50 dark:bg-gray-900">
                {filteredSongs.map(song => (
                    <div key={song.id} className="p-2 border-b dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <p className="font-bold dark:text-gray-200">{song.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{song.artist} - {song.singleName}</p>
                            <p className="text-sm font-mono dark:text-cyan-300">Votes: {(requestHourStatus.votes[song.id] || 0).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <input type="number" value={voteAmount} onChange={e => setVoteAmount(e.target.value)} className="w-20 p-1 border rounded text-center dark:bg-gray-700" />
                            <button onClick={() => castPlayerVotes(song.id, parseInt(voteAmount), 'money')} className="px-2 py-1 text-xs bg-blue-500 text-white rounded">Vote (¥)</button>
                            <button onClick={() => castPlayerVotes(song.id, parseInt(voteAmount), 'tickets')} className="px-2 py-1 text-xs bg-green-500 text-white rounded">Vote (Tix)</button>
                        </div>
                    </div>
                ))}
            </div>
             <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded">Close</button>
            </div>
        </ModalWrapper>
    );
};

const RequestHourResultModal = () => {
    if (!modalData) return null;
    const { results } = modalData;

    const [revealIndex, setRevealIndex] = useState(0);
    const revealCount = 10;
    
    const handleReveal = () => {
        setRevealIndex(prev => Math.min(results.length, prev + revealCount));
    };

    const revealedSongs = results.slice(0, revealIndex);

    // This is a special modal, so we won't use the standard ModalWrapper.
    // This allows for the full-screen backdrop-blur effect.
    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
            <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/10 border border-white/20 shadow-2xl text-white animate-in fade-in slide-in-from-bottom-5">
                
                {/* Header */}
                <div className="text-center p-6 border-b border-white/10">
                    <Award size={48} className="mx-auto text-pink-300 mb-3" />
                    <h2 className="text-3xl font-bold tracking-tight">Voting Has Concluded!</h2>
                    <p className="text-sm text-white/70 mt-2 max-w-xl mx-auto">
                        The fan-voted setlist is ready. Please proceed to <strong>Booking Major Concert</strong> and use the <strong>Import Request Hour</strong> button to import this setlist.
                    </p>
                </div>

                {/* Results List */}
                <div className="max-h-[55vh] overflow-y-auto p-4 space-y-2">
                    {revealedSongs.map(song => {
                        let rankStyle = 'bg-black/20 border-transparent';
                        if (song.rank === 1) {
                            rankStyle = 'bg-gradient-to-br from-yellow-400/50 to-orange-500/50 border-yellow-300/50';
                        } else if (song.rank <= 10) {
                            rankStyle = 'bg-pink-500/30 border-pink-400/40';
                        } else if (song.rank <= 50) {
                            rankStyle = 'bg-purple-500/20 border-purple-400/30';
                        }

                        return (
                            <div key={song.rank} className={`p-3 my-1 rounded-lg flex justify-between items-center border ${rankStyle} backdrop-blur-sm transition-all duration-300`}>
                                <div className="flex items-center gap-4">
                                    <span className={`font-black text-3xl w-16 text-center ${song.rank === 1 ? 'text-yellow-200' : 'text-white/80'}`}>
                                        #{song.rank}
                                    </span>
                                    <div>
                                        <p className="font-bold text-lg">{song.name}</p>
                                        <p className="text-xs opacity-70">{song.artist}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-xl font-bold">{song.votes.toLocaleString()}</p>
                                    <p className="text-xs opacity-70">votes</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer/Actions */}
                <div className="flex justify-between items-center mt-2 p-4 border-t border-white/10">
                    <p className="text-sm text-white/60">Revealed: {revealIndex} / {results.length}</p>
                    {revealIndex < results.length ? (
                        <button 
                            onClick={handleReveal} 
                            className="p-3 px-6 bg-pink-500/80 text-white font-bold rounded-lg shadow-lg hover:bg-pink-500 transition-all active:scale-95"
                        >
                            Reveal Next {Math.min(revealCount, results.length - revealIndex)}
                        </button>
                    ) : (
                        <button 
                            onClick={() => setShowModal(null)} 
                            className="p-3 px-8 bg-green-500/80 text-white font-bold rounded-lg shadow-lg hover:bg-green-500 transition-all active:scale-95"
                        >
                            Finish
                        </button>
                    )}
                    
                </div>
            </div>
        </div>
    );
};




const TrainingCampModal = () => {
        const [campMemberId, setCampMemberId] = useState('');
        const [campSkill, setCampSkill] = useState('singing');
        
            const availableMembers = getAllAvailableMembers(true).filter(m => m.isAvailable);
        
        const handleConfirm = () => {
            if (!campMemberId || !campSkill) return setMessage("Select a member and a skill.");
            startTrainingCamp(campMemberId, campSkill);
        };
        
        return (
            <ModalWrapper title={<span className="flex items-center"><Brain size={20} className="mr-2"/> Special Training Camp</span>}>
                <p className="text-sm text-gray-600 mb-4">Send one member away for 2 weeks. They will be unavailable but return with a significant +15 skill boost in the chosen area. Cost: ¥75,000.</p>
                
                <h4 className="font-semibold mb-1">Select Member</h4>
                <select 
                    value={campMemberId}
                    onChange={(e) => setCampMemberId(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="">-- Select Available Member --</option>
                    {availableMembers.map(m => (
                        <option key={m.id} value={m.id}>{m.name} (Stamina: {m.stamina})</option>
                    ))}
                </select>
                
                <h4 className="font-semibold mb-1">Select Focus Skill</h4>
                    <select 
                        value={campSkill} 
                        onChange={(e) => setCampSkill(e.target.value)}
                        className="w-full p-2 border rounded mb-3"
                    >
                        <option value="singing">Singing</option>
                        <option value="dancing">Dancing</option>
                        <option value="variety">Variety</option>
                        <option value="visual">Visual</option>
                        <option value="charisma">Charisma</option>
                        <option value="intelligence">Intelligence</option>
                    </select>

                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleConfirm} disabled={!campMemberId} className="p-2 bg-purple-500 text-white rounded disabled:bg-gray-400">
                        Start Camp (¥75k)
                    </button>
                </div>
            </ModalWrapper>
        );
    };
    
    const CreateSisterGroupModal = () => {
        const [sgName, setSgName] = useState('');
        const [sgType, setSgType] = useState('domestic');
        const [sgLocation, setSgLocation] = useState('');

        const handleConfirm = () => {
            if (!sgName.trim() || !sgLocation.trim()) {
                return setMessage("Group name and location cannot be empty.");
            }
            confirmCreateSisterGroup({ groupName: sgName.trim(), location: sgLocation.trim() });
        };
        
        return (
            <ModalWrapper title={<span className="flex items-center"><Globe size={20} className="mr-2"/> Establish New Sister Group</span>}>
                <p className="text-sm text-gray-600 mb-4">Expand your empire by establishing a new sister group in a new city. Cost: ¥250,000.</p>
                
                <h4 className="font-semibold mb-1">New Group Name</h4>
                <input 
                    type="text" 
                    value={sgName} 
                    onChange={(e) => setSgName(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="e.g., NMB48"
                />
                
                <h4 className="font-semibold mb-1">Location</h4>
                <input 
                    type="text" 
                    value={sgLocation} 
                    onChange={(e) => setSgLocation(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                    placeholder="e.g., Osaka"
                />
                            <h4 className="font-semibold mb-1">Group Type</h4>
            <select 
                value={sgType} 
                onChange={(e) => setSgType(e.target.value)}
                className="w-full p-2 border rounded mb-3"
            >
                <option value="domestic">Domestic</option>
                <option value="overseas">Overseas</option>
            </select>


                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                    <button onClick={handleConfirm} disabled={!sgName.trim() || !sgLocation.trim() || money < 250000} className="p-2 bg-red-500 text-white rounded disabled:bg-gray-400">
                        Establish Group (¥250k)
                    </button>
                </div>
            </ModalWrapper>
        );
    };
    
    const SisterGroupDisbandModal = () => {
        const sg = modalData;
        if (!sg) return null;

        return (
            <ModalWrapper title={<span className="flex items-center text-red-600"><Trash2 size={20} className="mr-2"/> Manage {sg.name}</span>}>
                <p className="text-sm text-gray-600 mb-4">You have two major options for the future of {sg.name}.</p>
                
                <h4 className="font-semibold mb-2">Choose an Action:</h4>
                <div className='space-y-3'>
                    <button 
                        onClick={() => handleDisbandSisterGroup(sg.id, true)} 
                        className="w-full p-3 bg-green-100 text-green-800 rounded font-bold border-l-4 border-green-500 hover:bg-green-200 transition-colors"
                    >
                        Grant Independence
                        <p className="text-xs font-normal">The group leaves your management and becomes a rival group, maintaining their fan base.</p>
                    </button>
                    <button 
                        onClick={() => handleDisbandSisterGroup(sg.id, false)} 
                        className="w-full p-3 bg-red-100 text-red-800 rounded font-bold border-l-4 border-red-500 hover:bg-red-200 transition-colors"
                    >
                        Force Disbandment
                        <p className="text-xs font-normal">The group ceases to exist. All members are released, and their fan base is scattered.</p>
                    </button>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                </div>
            </ModalWrapper>
        );
    };

const EditGroupNameModal = () => {
    const group = modalData;
    const [newName, setNewName] = useState(group?.name || '');

    const handleConfirm = () => {
        if (!newName.trim() || newName.trim() === group.name) {
            return setShowModal(null);
        }
        handleConfirmEditGroupName(group, newName.trim());
    };

    if (!group) return null;

    return (
        <ModalWrapper title={<span className="flex items-center"><Edit size={20} className="mr-2"/> Rename {group.name}</span>}>
            <p className="text-sm text-gray-600 mb-4">Enter the new name for the group.</p>
            <h4 className="font-semibold mb-1">Group Name</h4>
            <input 
                type="text" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                className="w-full p-2 border rounded mb-3"
                placeholder="Enter new group name"
            />
            <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 rounded">Cancel</button>
                <button onClick={handleConfirm} disabled={!newName.trim()} className="p-2 bg-green-500 text-white rounded disabled:bg-gray-400">
                    Confirm Rename
                </button>
            </div>
        </ModalWrapper>
    );
};
    // --- END NEW MODALS ---

const ExchangeStudentModal = () => {
    if (!modalData || !modalData.rival) return null;

    const { rival, rivalRoster } = modalData;
    const [step, setStep] = useState(1); // 1 for selecting rival, 2 for selecting player's member
    const [selectedRivalMembers, setSelectedRivalMembers] = useState([]);
    const [selectedPlayerMemberIds, setSelectedPlayerMemberIds] = useState([]);

    const availablePlayerMembers = getMainGroupRoster().filter(m => m.isAvailable);

    const handleNextStep = () => {
        if (selectedRivalMembers.length > 0) {
            setStep(2);
        }
    };

    const handleConfirm = () => {
        if (selectedRivalMembers.length === 0 || selectedPlayerMemberIds.length === 0) return;
        if (selectedRivalMembers.length !== selectedPlayerMemberIds.length) {
            setMessage("You must select an equal number of rival and player members to exchange.");
            return;
        }
        confirmExchangeStudent(rival, selectedRivalMembers, selectedPlayerMemberIds);
    };

    if (step === 1) {
        return (
            <ModalWrapper title={`Step 1: Choose Member(s) from ${rival.name}`} maxWidth="max-w-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Choose rival member(s) to join your group for one year.</p>
                <div className="space-y-1 max-h-[400px] overflow-y-auto border-t border-b dark:border-gray-700 p-1 mb-4">
                    {rivalRoster.map(member => (
                        <div 
                            key={member.id}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedRivalMembers.some(m => m.id === member.id) ? 'bg-blue-100 dark:bg-blue-800' : 'bg-white dark:bg-gray-700/50 hover:bg-gray-50'}`} 
                            onClick={() => {
                                setSelectedRivalMembers(prev => {
                                    const existing = prev.find(m => m.id === member.id);
                                    if (existing) {
                                        return prev.filter(m => m.id !== member.id);
                                    } else {
                                        return [...prev, { id: member.id, name: member.name, ...member }];
                                    }
                                });
                            }}
                        >
                            <div>
                                <p className="font-semibold text-sm">{member.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Vo: {member.singing} Da: {member.dancing} Vi: {member.visual} | Fans: {((member.fans.hardcore || 0) + (member.fans.casual || 0)).toLocaleString()}
                                </p>
                            </div>
                            <input type="checkbox" checked={selectedRivalMembers.some(m => m.id === member.id)} readOnly className="form-checkbox h-4 w-4 text-blue-600"/>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-2">
                    <button onClick={() => setShowModal(null)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Cancel</button>
                    <button onClick={handleNextStep} disabled={selectedRivalMembers.length === 0} className="p-3 bg-blue-600 text-white rounded font-bold disabled:bg-gray-400">Next: Choose Your Member(s)</button>
                </div>
            </ModalWrapper>
        );
    }

    if (step === 2) {
        return (
            <ModalWrapper title={`Step 2: Choose Your Member(s) to Send`} maxWidth="max-w-2xl">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    You have selected {selectedRivalMembers.length} member(s) from {rival.name}. 
                    You must choose an equal number of your own members to send in exchange.
                </p>
                <div className="space-y-1 max-h-[400px] overflow-y-auto border-t border-b dark:border-gray-700 p-1 mb-4">
                    {availablePlayerMembers.map(member => (
                        <div 
                            key={member.rosterId} 
                            className={`flex items-center justify-between p-2 rounded cursor-pointer ${selectedPlayerMemberIds.includes(member.id) ? 'bg-blue-100 dark:bg-blue-800' : 'bg-white dark:bg-gray-700/50 hover:bg-gray-50'}`} 
                            onClick={() => {
                                setSelectedPlayerMemberIds(prev => {
                                    if (prev.includes(member.rosterId)) {
                                        return prev.filter(id => id !== member.rosterId);
                                    } else {
                                        return [...prev, member.rosterId];
                                    }
                                });
                            }}
                        >
                            <div>
                                <p className="font-semibold text-sm">{member.name}</p>
                                 <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Vo: {member.singing} Da: {member.dancing} Vi: {member.visual} | Fans: {getTotalFansForMember(member).toLocaleString()}
                                </p>
                            </div>
                            <input type="checkbox" checked={selectedPlayerMemberIds.includes(member.rosterId)} readOnly className="form-checkbox h-4 w-4 text-blue-600"/>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between gap-2">
                    <button onClick={() => setStep(1)} className="p-2 bg-gray-300 dark:bg-gray-600 rounded px-4">Back</button>
                    <button onClick={handleConfirm} disabled={selectedPlayerMemberIds.length !== selectedRivalMembers.length || selectedPlayerMemberIds.length === 0} className="p-3 bg-purple-600 text-white rounded font-bold disabled:bg-gray-400">Confirm Exchange</button>
                </div>
            </ModalWrapper>
        );
    }

    return null;
};


const DraftKaigiModal = () => {
    if (!draftKaigi) return null;

    const {
        stage, prospects, draftingTeams, picks,
        currentPick, log, lotteryResults
    } = draftKaigi;
    
    // UI state
    const [selectedNomineeId, setSelectedNomineeId] = useState(null);
    const [isLotteryRunning, setIsLotteryRunning] = useState({});


    useEffect(() => {
        if (stage === 'draft' && draftKaigi.draftOrder[currentPick - 1]?.type === 'rival') {
            // Add a small delay for the AI to feel more natural
            const timer = setTimeout(() => {
                handleAiDraftPick();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [stage, currentPick, draftKaigi]);


    const renderNominationStage = () => {
        const topProspects = prospects.filter(p => p.potentialGrade === 'S');
        return (
            <div>
                <h2 className="text-2xl font-bold text-center mb-4">Stage 1: Nomination Round</h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-4">Nominate one of the top prospects for your main group. If multiple teams nominate the same girl, a lottery will decide who gets negotiation rights.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {topProspects.map(prospect => (
                        <div key={prospect.id} 
                             className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedNomineeId === prospect.id ? 'border-yellow-500 bg-yellow-100 dark:bg-yellow-900/50' : 'bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                             onClick={() => setSelectedNomineeId(prospect.id)}>
                            <h3 className="font-bold text-lg">{prospect.name} <span className="text-sm font-normal text-gray-500">({prospect.hometown})</span></h3>
                            <p className="text-yellow-400 font-bold">Grade: {prospect.potentialGrade}</p>
                            <p className="text-xs italic text-gray-500 mt-1">"{prospect.scoutingComment}"</p>
                            <p className="text-xs mt-2">Rival Interest: {prospect.competingInterest.join(', ') || 'None'}</p>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <button 
                        onClick={() => advanceDraftStage('process_nominations', { playerNominationId: selectedNomineeId })}
                        disabled={!selectedNomineeId}
                        className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg disabled:bg-gray-400">
                        Lock In Nomination
                    </button>
                </div>
            </div>
        );
    };

    const renderNominationRevealStage = () => {
         const prospectsInLottery = prospects.filter(p => p.nominatedBy && p.nominatedBy.length > 1);
         return (
            <div>
                <h2 className="text-2xl font-bold text-center mb-4">Nomination Results</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto p-2">
                    {prospects.filter(p => p.nominatedBy && p.nominatedBy.length > 0).map(prospect => (
                        <div key={prospect.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                            <h3 className="text-xl font-bold">{prospect.name}</h3>
                            <p className="text-sm">Nominated By: {prospect.nominatedBy.map(t => t.name).join(', ')}</p>
                            {(() => {
                                const lottery = lotteryResults.find(r => r.prospectId === prospect.id);
                                if (lottery) return <p className="font-bold text-green-500 mt-2">Lottery Winner: {lottery.winnerName}!</p>;
                                if (prospect.nominatedBy.length > 1) {
                                    return (
                                        <div className="mt-2">
                                            <button 
                                                onClick={() => {
                                                    setIsLotteryRunning(prev => ({...prev, [prospect.id]: true}));
                                                    setTimeout(() => {
                                                        advanceDraftStage('run_lottery', { prospectId: prospect.id });
                                                        setIsLotteryRunning(prev => ({...prev, [prospect.id]: false}));
                                                    }, 1500);
                                                }}
                                                disabled={isLotteryRunning[prospect.id]}
                                                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded mt-1 disabled:bg-gray-400">
                                                {isLotteryRunning[prospect.id] ? "Drawing..." : "Start Lottery"}
                                            </button>
                                        </div>
                                    );
                                }
                                return <p className="font-bold text-blue-500 mt-2">Negotiation rights secured by {prospect.nominatedBy[0].name}.</p>;
                            })()}
                        </div>
                    ))}
                </div>
                 <div className="text-center mt-6">
                    <button 
                        onClick={() => advanceDraftStage('start_snake_draft')}
                        disabled={prospectsInLottery.some(p => !lotteryResults.find(r => r.prospectId === p.id))}
                        className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg disabled:bg-gray-400">
                        Proceed to Snake Draft
                    </button>
                </div>
            </div>
        );
    };

    const renderSnakeDraftStage = () => {
        const { prospects, draftOrder, currentPick, log } = draftKaigi;
        if (!draftOrder || draftOrder.length === 0) return <p>Setting up draft...</p>;

        const draftFinished = currentPick > draftOrder.length || prospects.length === 0;
        const currentTeam = !draftFinished ? draftOrder[currentPick - 1] : null;
        const isPlayerTurn = currentTeam && currentTeam.type === 'player';

        if (draftFinished) {
            return (
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Draft Complete!</h2>
                    <button onClick={finishDraft} className="px-8 py-3 bg-green-600 text-white font-bold rounded-lg">
                        Finalize Selections & Proceed
                    </button>
                </div>
            );
        }

        return (
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                    <h3 className="font-bold text-lg mb-2">Available Prospects ({prospects.length})</h3>
                    <div className="max-h-[60vh] overflow-y-auto space-y-2 p-2 border rounded">
                        {prospects.map(prospect => (
                            <div key={prospect.id} 
                                 className={`p-2 rounded border-2 ${isPlayerTurn ? 'cursor-pointer hover:border-blue-500 bg-white dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-800'}`}
                                 onClick={isPlayerTurn ? () => handlePlayerDraftPick(prospect.id) : undefined}>
                                <div className="flex justify-between items-center">
                                    <h4 className="font-bold">{prospect.name}</h4>
                                    <span className="font-mono text-sm text-yellow-500">Pot: {prospect.potential} ({prospect.potentialGrade})</span>
                                </div>
                                <p className="text-xs text-gray-500">Vo:{prospect.vocal} Da:{prospect.dance} Vi:{prospect.visual} Ch:{prospect.charisma} In:{prospect.intelligence}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-4">
                    <h3 className="font-bold text-lg mb-2">Draft Log</h3>
                    <div className="max-h-[60vh] overflow-y-auto space-y-2 p-2 bg-gray-100 dark:bg-gray-900 rounded border">
                        {log.slice().reverse().map((entry, index) => (
                            <p key={index} className={`text-sm p-1 rounded ${entry.includes('selects') ? 'font-semibold' : ''}`}>{entry}</p>
                        ))}
                    </div>
                </div>
                <div className="col-span-3">
                    <h3 className="font-bold text-lg mb-2">Picks</h3>
                     <div className="max-h-[60vh] overflow-y-auto space-y-2">
                    {picks.map((pick) => (
                        <div key={pick.prospectId} className="p-2 bg-white dark:bg-gray-800 rounded shadow text-sm">
                            <p className="font-bold truncate">
                                {pick.round === 'Nomination' ? (pick.pick > 0 ? `LOTT:` : 'NOM:') : `R${pick.round} P${pick.pick}:`} {pick.teamName}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 truncate">{pick.prospectName}</p>
                        </div>
                    ))}
                    </div>
                </div>
                 <div className="col-span-12 text-center mt-4">
                    {isPlayerTurn && <p className="text-xl font-bold animate-pulse">You are on the clock! Select a prospect.</p>}
                    {!isPlayerTurn && <p className="text-xl font-bold">Current Pick: {currentTeam?.name}</p>}
                </div>
            </div>
        );
    };
    
    const renderCurrentStage = () => {
        switch (stage) {
            case 'nomination_start':
                return renderNominationStage();
            case 'nomination_reveal':
                return renderNominationRevealStage();
            case 'draft':
                return renderSnakeDraftStage();
            default:
                return <p>Loading draft... Current stage: {stage}</p>;
        }
    };

    return (
        <ModalWrapper title="Draft Kaigi" maxWidth="max-w-6xl">
            {renderCurrentStage()}
        </ModalWrapper>
    );
}


       const MemberParticipationHistory = ({ member, getFormattedDateForWeek }) => { 
         
         const songHistory = (member.songsParticipation || []);
         const centerHistory = (member.centerHistory || []);
         const teamHistory = (member.teamHistory || []);
         const electionHistory = (member.electionHistory || []);
         const jankenHistory = (member.jankenHistory || []);
         const albumTrackHistory = songHistory.filter(s => s.type === 'album');
         const bSideTrackHistory = songHistory.filter(s => s.type === 'b-side'); // This is the new line
         const memberPerformances = performanceHistory.filter(p => (p.members || []).map(String).includes(String(member.rosterId || member.id)));
         const titleTrackHistory = songHistory.filter(s => s.type === 'title');
         const majorConcertHistory = memberPerformances.filter(p => p.category === "Major Concert");
         const otherPerformanceHistory = memberPerformances.filter(p => p.category !== "Major Concert");
   
         return (
             <div className="mt-4 border-t pt-4">
                 <h4 className="font-semibold mb-2 flex items-center"><Music size={16} className="mr-2"/> Participation & Team History</h4>
                 
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><CalendarCheck size={14} className='mr-1 text-blue-500'/> Team History ({teamHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-blue-50 dark:bg-gray-800">
                     {teamHistory.length === 0 && <p className="text-gray-500 italic p-1">No team history recorded.</p>}
                     {teamHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1.5 rounded bg-blue-100 dark:bg-gray-700 border-b border-blue-200 dark:border-gray-600">
                             <p className="font-bold text-blue-800 dark:text-blue-200">{entry.event}</p>
                             <p className="text-gray-600 dark:text-gray-400">Week {entry.week} ({getFormattedDateForWeek(entry.week)})</p> 
                         </div>
                     ))}
                 </div>

                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Trophy size={14} className='mr-1 text-yellow-500'/> General Election History ({electionHistory.length}):</p>
                    <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-yellow-50 dark:bg-gray-800">
                        {electionHistory.length === 0 && <p className="text-gray-500 italic p-1">No election history recorded.</p>}
                        {electionHistory.slice().reverse().map((entry, index) => (
                            <div key={index} className="p-1.5 rounded bg-yellow-100 dark:bg-gray-700 border border-yellow-200 dark:border-yellow-600">
                                <p className="font-bold text-yellow-800 dark:text-yellow-200">
                                    Rank #{entry.rank} ({entry.unit})
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Year {entry.year} Election {getFormattedDateForWeek(entry.week)}
                                </p> 
                            </div>
                        ))}
                    </div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Hand size={14} className='mr-1 text-gray-500'/> Janken Tournament History ({jankenHistory.length}):</p>
                        <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-gray-50 dark:bg-gray-800">
                            {jankenHistory.length === 0 && <p className="text-gray-500 italic p-1">No Janken history recorded.</p>}
                            {jankenHistory.slice().reverse().map((entry, index) => {
                                const isWinner = entry.roundName === 'Winner';
                                const hasRank = typeof entry.rank === 'number' && entry.rank > 0;

                                return (
                                    <div key={index} className={`p-1.5 rounded border ${isWinner ? 'bg-yellow-100 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700' : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600'}`}>
                                        <p className={`font-bold ${isWinner ? 'text-yellow-800 dark:text-yellow-200' : 'text-gray-800 dark:text-gray-200'}`}>
                                            {hasRank ? `Senbatsu Rank #${entry.rank}` : (isWinner ? 'Tournament Winner' : 'Eliminated')}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            <span className="font-semibold">{entry.roundName}</span> • {getFormattedDateForWeek(entry.week)}
                                            {!isWinner && entry.lostTo && <span className="italic"> (vs {entry.lostTo})</span>}
                                        </p> 
                                    </div>
                                )
                            })}
                 </div>

                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Film size={14} className='mr-1 text-red-500'/> Title Tracks ({titleTrackHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-red-50 dark:bg-gray-800">
                     {titleTrackHistory.length === 0 && <p className="text-gray-500 italic p-1">No title track senbatsu positions.</p>}
                     {titleTrackHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1.5 rounded bg-red-100 dark:bg-gray-700 border border-red-200 dark:border-red-600">
                             <p className="font-bold text-red-800 dark:text-red-200">{entry.songName}</p>
                             <p className="text-gray-600 dark:text-gray-400">Single: {entry.singleName} ({entry.group}) • {getFormattedDateForWeek(entry.week)}</p>
 
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Position: <span className="font-semibold text-red-700 dark:text-red-300">{entry.row || 'N/A'}</span></p>
                         </div>
                     ))}
                 </div>
   
                 {/* THIS SECTION IS NOW CORRECTED */}
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Music size={14} className='mr-1 text-green-500'/> B-Side Tracks ({bSideTrackHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-green-50 dark:bg-gray-800">
                     {bSideTrackHistory.length === 0 && <p className="text-gray-500 italic p-1">No B-side track positions.</p>}
                     {bSideTrackHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1.5 rounded bg-green-100 dark:bg-gray-700 border border-green-200 dark:border-green-600">
                             <p className="font-bold text-green-800 dark:text-green-200">{entry.songName}</p>
                             <p className="text-gray-600 dark:text-gray-400">Single: {entry.singleName} ({entry.group}) • {getFormattedDateForWeek(entry.week)}</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Position: <span className="font-semibold text-green-700 dark:text-green-300">{entry.row || 'N/A'}</span></p>
                         </div>
                     ))}
                 </div>

                 {/* THIS IS THE NEW ALBUM SECTION */}
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Library size={14} className='mr-1 text-purple-500'/> Album Tracks ({albumTrackHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-purple-50 dark:bg-gray-800">
                     {albumTrackHistory.length === 0 && <p className="text-gray-500 italic p-1">No album track positions.</p>}
                     {albumTrackHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1.5 rounded bg-purple-100 dark:bg-gray-700 border border-purple-200 dark:border-purple-600">
                             <p className="font-bold text-purple-800 dark:text-purple-200">{entry.songName}</p>
                             <p className="text-gray-600 dark:text-gray-400">Album: {entry.singleName} ({entry.group}) • {getFormattedDateForWeek(entry.week)}</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Position: <span className="font-semibold text-purple-700 dark:text-purple-300">{entry.row || 'N/A'}</span></p>
                         </div>
                     ))}
                 </div>
   
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Star size={14} className='mr-1 text-yellow-500'/> Center Positions ({centerHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-yellow-50 dark:bg-gray-800">
                     {centerHistory.length === 0 && <p className="text-gray-500 italic p-1">No center history recorded.</p>}
                     {centerHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1 rounded bg-yellow-100 dark:bg-gray-700 border border-yellow-300 dark:border-yellow-600">
                             <p className="font-bold text-yellow-800 dark:text-yellow-200">{entry.songName}</p>
                             <p className="text-gray-600 dark:text-gray-400">Single: {entry.singleName} (Group: {entry.group})</p> 
                         </div>
                     ))}
                 </div>
   
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><Trophy size={14} className='mr-1 text-purple-500'/> Major Concerts ({majorConcertHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-purple-50 dark:bg-gray-800">
                     {majorConcertHistory.length === 0 && <p className="text-gray-500 italic p-1">No major concerts attended.</p>}
                     {majorConcertHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1 rounded bg-purple-100 dark:bg-gray-700 border border-purple-300 dark:border-purple-600">
                             <p className="font-bold text-purple-800 dark:text-purple-200">{entry.name}</p>
                             <p className="text-gray-600 dark:text-gray-400">Date: {getFormattedDateForWeek(entry.week)}</p>
                         </div>
                     ))}
                 </div>
   
                 <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mt-3 flex items-center"><ClipboardCheck size={14} className='mr-1 text-indigo-500'/> Performances ({otherPerformanceHistory.length}):</p>
                 <div className="max-h-24 overflow-y-auto text-xs space-y-1 mb-2 p-1 border rounded bg-indigo-50 dark:bg-gray-800">
                     {otherPerformanceHistory.length === 0 && <p className="text-gray-500 italic p-1">No other performances recorded.</p>}
                     {otherPerformanceHistory.reverse().map((entry, index) => (
                         <div key={index} className="p-1 rounded bg-indigo-100 dark:bg-gray-700 border border-indigo-300 dark:border-indigo-600">
                             <p className="font-bold text-indigo-800 dark:text-indigo-200">{entry.name}</p>
                             <p className="text-gray-600 dark:text-gray-400">{getFormattedDateForWeek(entry.week)} | {entry.category}</p>
 
                         </div>
                     ))}
                 </div>
             </div>
         );
       };
    
const PyramidRanking = () => {
    const sortedMembers = getMainGroupRoster().sort((a, b) => (a.rank || 999) - (b.rank || 999));

    const tiers = {
        'Center (#1)': sortedMembers.slice(0, 1),
        'Kami 7 (#2-7)': sortedMembers.slice(1, 7),
        'Senbatsu (#8-16)': sortedMembers.slice(7, 16),
        'Undergirls (#17-32)': sortedMembers.slice(16, 32),
        'Next Girls (#33-48)': sortedMembers.slice(32, 48),
        'Future Girls (#49-64)': sortedMembers.slice(48, 64),
        'Upcoming Girls (#65-80)': sortedMembers.slice(64, 80),
        'Unplaced (81+)': sortedMembers.slice(80),
    };

    const tierStyles = {
       'Center (#1)':         'from-yellow-200 via-pink-200 to-amber-200 text-amber-800 border-amber-300',
       'Kami 7 (#2-7)':       'from-pink-200 to-purple-200 text-pink-800 border-pink-300',
       'Senbatsu (#8-16)':    'from-blue-200 to-cyan-200 text-blue-800 border-blue-300',
       'Undergirls (#17-32)': 'from-orange-200 to-yellow-200 text-orange-800 border-orange-300',
       'Next Girls (#33-48)': 'from-teal-200 to-green-200 text-teal-800 border-teal-300',
       'Future Girls (#49-64)': 'from-indigo-200 to-violet-200 text-indigo-800 border-indigo-300',
       'Upcoming Girls (#65-80)': 'from-rose-200 to-fuchsia-200 text-rose-800 border-rose-300',
       'Unplaced (81+)':      'from-slate-200 to-gray-300 text-slate-600 border-slate-400',
    };

    // Converted the renderTier helper into a proper component
    const Tier = ({ tierName, tierMembers }) => {
        if ((tierMembers || []).length === 0) return null;
        
        return (
            <div className={`p-2 m-1 rounded-xl shadow-lg text-center bg-gradient-to-br ${tierStyles[tierName]} border-2 w-full transition-all duration-300 hover:shadow-xl`}>
                <h3 className="font-bold text-lg" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.7)' }}>{tierName}</h3>
                <div className={`flex flex-wrap justify-center gap-1 mt-2`}>
                    {tierMembers.map((member) => (
                       <div key={member.rosterId} className="text-xs p-1 bg-white/50 backdrop-blur-sm rounded-md flex-shrink-0" style={{flexBasis: '80px'}}>
                           <span className="font-bold block text-pink-500">#{member.rank}</span>
                           <span className="truncate block font-semibold">{member.name}</span>
                       </div>
                    ))}
                </div>
            </div>
        );
    };
  
    return (
        <div className="bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 dark:from-slate-800 dark:via-slate-900 dark:to-black p-4 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-500" style={{ textShadow: '1px 1px 3px rgba(255, 255, 255, 0.5)' }}>
                Group Ranking Pyramid
            </h2>
            
            <div className="w-full max-w-2xl mx-auto">
                <div className="flex flex-col items-center space-y-1">
                    {/* Now we call the Tier component and pass a unique key */}
                    {Object.entries(tiers).map(([name, members]) => (
                        <Tier key={name} tierName={name} tierMembers={members} />
                    ))}
                </div>
            </div>
            
            {sortedMembers.length === 0 && <p className="text-gray-500 text-center p-8">Recruit members to see the ranking pyramid!</p>}
        </div>
    );
};
    


    // --- STYLES/HELPERS ---
    const StatBar = ({ label, value, max = 100, color = 'bg-blue-500' }) => (
      <div className="mb-1">
        <div className="flex justify-between text-xs font-semibold mb-0.5">
          <span>{label}</span>
          <span>{value} / {max}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className={color + " h-2 rounded-full"} style={{ width: `${((value || 0) / max) * 100}%` }}></div>
        </div>
      </div>
    );

const TabButton = ({ id, label, icon: Icon }) => (
    <button
        onClick={() => {
            setCurrentTab(id);
            setSelectedMember(null);
        }}
        className={`flex-1 py-1 text-xs font-medium flex flex-col items-center justify-center gap-0.5 !bg-gray-50 dark:!bg-gray-800 ${currentTab === id ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
    >
        <Icon size={16} />
        <span className="text-[10px]">{label}</span>
    </button>
);

    // --- MAIN UI ---
if (!gameStarted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Saved Games Column */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200">Load Production</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {savedGames.length > 0 ? (
              savedGames.map((game) => (
                <button
                  key={game.username}
                  onClick={() => loadGame(game.username)}
                  className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 hover:shadow-md transition-all border dark:border-gray-600"
                >
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{game.groupName}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">Producer: {game.username}</p>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>Week: {game.week}</span>
                    <span>Money: ¥{game.money.toLocaleString()}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center p-8 text-gray-500">
                <p>No saved games found.</p>
                <p className="text-xs mt-1">Start a new production to create a save file!</p>
              </div>
            )}
          </div>
        </div>

        {/* New Game Column */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border-2 border-blue-500">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
            <Plus size={24} />
            Start New Production
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Enter your Producer Name and Group Name to begin.</p>
          <input
            type="text"
            value={startUsername}
            onChange={(e) => setStartUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg mb-4 text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Producer Name (e.g., Aki-P)"
          />
          <div className="flex w-full gap-2 mb-5">
            <input
              type="text"
              value={startGroupName}
              onChange={(e) => setStartGroupName(e.target.value)}
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg text-center focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Group Name (e.g., AKB48)"
            />
            <button
              onClick={generateRandomGroupName}
              className="p-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors flex items-center justify-center"
              title="Generate Random Name"
            >
              <Shuffle size={20} />
            </button>
          </div>
          <button
            onClick={handleStartGame}
            disabled={!startUsername.trim() || !startGroupName.trim()}
            className="w-full p-3 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            Begin
          </button>
        </div>
      </div>
    </div>
  );
}

    return (
      <div className="flex flex-col lg:flex-row h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
        {/* --- Left Column (Main Content) --- */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Header & Message Bar */}
          <header className="shadow-md p-2 lg:p-4 flex justify-between items-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div>
<h1 className="text-lg lg:text-2xl font-bold text-gray-800">{groupName}</h1>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowModal('saveGame')} d className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 disabled:bg-gray-300 disabled:text-gray-500" title="Save Game (via Username)"><Save size={20} /></button>
              <button onClick={() => setShowModal('loadGame')} d className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 disabled:bg-gray-300 disabled:text-gray-500" title="Load Game"><Upload size={20} /></button>
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200" title="Notifications">
                <Bell size={20} />
                {notifications.length > 0 && !showNotifications && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>}
              </button>
            </div>
          </header>
          {message && <div className="p-1 bg-blue-100 text-blue-800 text-center text-sm">{message}</div>}
          {activeTour && <div className="p-2 bg-red-100 text-red-800 text-center text-sm font-bold flex items-center justify-center"><Plane size={16} className='mr-2'/> Active Tour: {activeTour.name} ({activeTour.weeksLeft} weeks left)</div>}

            {isCampaignActive && <div className="p-2 bg-yellow-100 text-yellow-800 text-center text-sm font-bold flex items-center justify-center">
                <Zap size={16} className='mr-2'/> ELECTION CAMPAIGN ACTIVE! Ends in {campaignEndWeek - week} week(s).
            </div>}


          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6">
            {/* ----- MEMBERS TAB ----- */}
                {currentTab === 'members' && (
                  <div>
                    <div className="flex justify-between items-center mb-2 border-b pb-1">
                      <h2 className="text-base font-bold">Members ({getMainGroupRoster().length})</h2>
                      <div className='flex gap-1'>
                          <button onClick={() => setMemberView('list')} className={`px-2 py-1 text-xs rounded-md shadow-sm ${memberView === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                              <Users size={14} className='inline mr-1'/> List
                          </button>
                          <button onClick={() => setMemberView('ranking')} className={`px-2 py-1 text-xs rounded-md shadow-sm ${memberView === 'ranking' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                              <Award size={14} className='inline mr-1'/> Ranking
                          </button>
                          <button onClick={() => setMemberView('graduated')} className={`px-2 py-1 text-xs rounded-md shadow-sm ${memberView === 'graduated' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                              <GraduationCap size={14} className='inline mr-1'/> Graduated
                          </button>
                      </div>
                    </div>
                        {memberView === 'list' ? (
                            <>
                                <div className="flex justify-end items-center mb-2">
                                    <button onClick={restAllTired} className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md shadow-sm mr-2">Rest Tired</button>
                                </div>
                                
                                {/* --- NEW: Filter and Sort Controls --- */}
                                <div className="my-4 p-3 bg-gray-200 dark:bg-gray-800 rounded-lg flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <label htmlFor="member-filter" className="font-semibold text-sm mr-2">Filter by:</label>
                                        <select
                                            id="member-filter"
                                            value={memberFilter}
                                            onChange={e => setMemberFilter(e.target.value)}
                                            className="p-1.5 border rounded-md text-sm bg-white dark:bg-gray-700 dark:border-gray-600"
                                        >
                                            <option value="all">All Groups</option>
                                            <option value="main">{groupName}</option>
                                            {(sisterGroups || []).map(sg => <option key={`filter-sg-${sg.id}`} value={sg.name}>{sg.name}</option>)}
                                            <optgroup label="Teams">
                                                {(teams || []).map(t => <option key={`filter-team-${t.id}`} value={`team-${t.id}`}>{t.name}</option>)}
                                            </optgroup>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-sm">Sort by:</span>
                                        <button onClick={() => setMemberSort({ key: 'rank', asc: true })} className={`px-2 py-1 text-xs rounded ${memberSort.key === 'rank' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>Rank</button>
                                        <button onClick={() => setMemberSort({ key: 'fans', asc: false })} className={`px-2 py-1 text-xs rounded ${memberSort.key === 'fans' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>Fans</button>
                                        <button onClick={() => setMemberSort({ key: 'avgSkill', asc: false })} className={`px-2 py-1 text-xs rounded ${memberSort.key === 'avgSkill' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>Avg Skill</button>
                                        <button onClick={() => setMemberSort({ key: 'age', asc: true })} className={`px-2 py-1 text-xs rounded ${memberSort.key === 'age' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`}>Age</button>
                                    </div>
                                </div>
                                {/* --- END NEW --- */}
                                {/* Prepare and map through correctly grouped members */}
                                {(() => {
                                    let allMembers = getMainGroupRoster();

                                    // 2. Filter Members
                                    let filteredMembers = allMembers;
                                    if (memberFilter !== 'all') {
                                        if (memberFilter === 'main') {
                                            filteredMembers = allMembers.filter(m => !m.isSisterMember);
                                        } else if (memberFilter.startsWith('team-')) {
                                            const teamId = parseInt(memberFilter.replace('team-', ''), 10);
                                            const team = teams.find(t => t.id === teamId);
                                            const teamMemberIds = new Set((team?.members || []).map(String));
                                            filteredMembers = allMembers.filter(m => teamMemberIds.has(String(m.rosterId || m.id)));
                                        } else { // It's a sister group name
                                            filteredMembers = allMembers.filter(m => m.isSisterMember && m.displayGroupName === memberFilter);
                                        }
                                    }

                                    // 3. Sort Members
                                    filteredMembers.sort((a, b) => {
                                        let valA, valB;
                                        switch (memberSort.key) {
                                            case 'fans':
                                                valA = getTotalFansForMember(a);
                                                valB = getTotalFansForMember(b);
                                                break;
                                            case 'avgSkill':
                                                valA = getAvgSkill(a);
                                                valB = getAvgSkill(b);
                                                break;
                                            case 'age':
                                                valA = a.age;
                                                valB = b.age;
                                                break;
                                            case 'rank':
                                            default:
                                                valA = a.rank;
                                                valB = b.rank;
                                                break;
                                        }

                                        if (valA < valB) return memberSort.asc ? -1 : 1;
                                        if (valA > valB) return memberSort.asc ? 1 : -1;
                                        return 0;
                                    });

                                    const groupsMap = new Map();

                                    // Initialize map with all group names that have members in the filtered list
                                    const relevantGroupNames = [...new Set(filteredMembers.map(m => m.isSisterMember ? m.displayGroupName : groupName))];
                                    relevantGroupNames.forEach(name => groupsMap.set(name, []));

                                    // Sort every member into the correct group
                                    filteredMembers.forEach(member => {
                                        const memberGroupName = member.isSisterMember ? member.displayGroupName : groupName;
                                        if (groupsMap.has(memberGroupName)) {
                                            groupsMap.get(memberGroupName).push(member);
                                        }
                                    });

                                    const groupsArray = Array.from(groupsMap, ([name, members]) => ({ name, members }))
                                                         .sort((a,b) => a.name === groupName ? -1 : (b.name === groupName ? 1 : a.name.localeCompare(b.name)));


                                    return groupsArray.map(groupData => (
                                        <div key={groupData.name} className="mb-6">
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 border-b-2 border-pink-500 pb-1 mb-3">
                                                {groupData.name}
                                            </h3>
                                            {groupData.members.length > 0 ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {groupData.members.map(m => (
                                                        <div key={m.rosterId || m.id}
                                                            className={`bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer focus:outline-none transition-all duration-300
                                                                ${!m.isAvailable ? 'opacity-60' : ''}
                                                                ${m.isExchangeStudent ? 'border-2 border-purple-500' : ''}
                                                                ${(m.kenninGroups || []).length > 0 ? 'border-2 border-yellow-400 dark:border-yellow-500' : ''}
                                                                ${selectedMember && (selectedMember.rosterId || selectedMember.id) === (m.rosterId || m.id) ? 'border-2 border-blue-500 ring-2 ring-blue-200' : 'hover:shadow-lg'}`}
                                                            onClick={() => setSelectedMember(m)}>
                                                                
                                                            <div className="p-2">
                                                            {m.isGraduating && m.graduationWeek && (
                                                                    <p className="text-sm font-bold text-yellow-500 mb-1 flex items-center">
                                                                    <AlertCircle size={14} className="inline mr-1" />
                                                                    Graduating in {m.graduationWeek - week} weeks
                                                                </p>
                                                            )}

                                                                    {
                                                                        !m.isGraduating && getGraduationRisk(m).text && (
                                                                            <p className={`text-xs font-bold ${getGraduationRisk(m).color} mb-1 flex items-center`}>
                                                                                <AlertCircle size={12} className="inline mr-1" />
                                                                                {getGraduationRisk(m).text}
                                                                            </p>
                                                                        )
                                                                    }

                                                                <div className="flex justify-between items-start mb-1">
                                                                    <h3 className="text-base font-bold flex items-center">
                                                                        {m.name}
                                                                        {m.isExchangeStudent && <span className="text-xs font-semibold bg-purple-200 text-purple-800 px-1.5 py-0.5 rounded-full ml-2">Exchange</span>}
                                                                        {m.isCurrentCenter && <Trophy size={16} className="ml-2 text-yellow-500" title="Current Center" />}
                                                                        {(Object.values(groupRoles).includes(m.id) || (m.teamId && groupRoles[m.teamId] === m.id)) && <Shield size={16} className="ml-2 text-purple-500" title="Captain" />}
                                                                    </h3>
                                                                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${m.position === 'center' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-700'}`}>
                                                                        #{allMembers.findIndex(r => (r.rosterId || r.id) === (m.rosterId || m.id)) + 1}
                                                                    </span>
                                                                </div>
                                                                <p className="text-xs text-gray-500 mb-0.5">{getMemberGroupStatus(m)}</p>
                                                                    <p className="text-xs text-gray-500 mb-1.5">{`${m.generation ? `${m.generation} | ` : ''}${m.hometown} | ${m.personality} | ${m.age} y.o. | Fans: ${getTotalFansForMember(m).toLocaleString()}`}</p>                                                     
                                                                <StatBar label="Singing" value={m.singing} color="bg-blue-500" />
                                                                <StatBar label="Dancing" value={m.dancing} color="bg-green-500" />
                                                                <StatBar label="Variety" value={m.variety} color="bg-pink-500" />
                                                                <StatBar label="Visual" value={m.visual} color="bg-cyan-500" />
                                                                <StatBar label="Charisma" value={m.charisma} color="bg-rose-500" />
                                                                <StatBar label="Intelligence" value={m.intelligence} color="bg-orange-500" />
                                                                <hr className="my-1 border-dashed dark:border-gray-700"/>
                                                                <StatBar label="Stamina" value={m.stamina} color={m.stamina < 30 ? "bg-red-500" : "bg-gray-400"} />
                                                                <StatBar label="Stress" value={m.stress} color={m.stress > 70 ? "bg-yellow-500" : "bg-indigo-500"} />
                                                                <StatBar label="Morale" value={m.morale} color="bg-purple-500" />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">No members in this group for the current filter.</p>
                                            )}
                                        </div>
                                    ));
                                })()}
                            </>
                        ) : memberView === 'ranking' ? (
                            <PyramidRanking />
                        ) : (
                          <div>
                            <h2 className="text-xl font-bold mb-4 flex items-center"><GraduationCap size={22} className="mr-2"/> Hall of Fame ({hallOfFame.length})</h2>
                            {hallOfFame.length > 0 ? (
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
{hallOfFame.map(m => (
                                  <div key={m.id}
                                    className={`bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden cursor-pointer focus:outline-none transition-all duration-300 opacity-70 ${selectedMember && selectedMember.id === m.id ? 'border-2 border-blue-500 ring-2 ring-blue-200' : 'hover:shadow-lg'}`}
                                    onClick={() => setSelectedMember({ ...m, isAvailable: false })}>
                                    <div className="p-2">
                                        <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold flex items-center">
                    {m.name}
                    {m.isCurrentCenter && <Trophy size={16} className="ml-2 text-yellow-500" title="Current Center" />}
                    {(Object.values(groupRoles).includes(m.id) || (m.teamId && groupRoles[m.teamId] === m.id)) && <Shield size={18} className="ml-2 text-purple-500" title="Captain" />}
                </h3>
                                            <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full bg-gray-500 text-white`}>
                                                Graduated
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mb-0.5">{m.teamHistory.find(e => e.event.includes('Graduated'))?.event || 'Graduated'}</p>
                                        <p className="text-xs text-gray-500 mb-1.5">{`${m.generation ? `${m.generation} | ` : ''}${m.hometown} | ${m.personality} | ${m.age} y.o. | Fans: ${getTotalFansForMember(m).toLocaleString()}`}</p>                                                     
                                        <StatBar label="Singing" value={m.singing} color="bg-blue-500" />
                                        <StatBar label="Dancing" value={m.dancing} color="bg-green-500" />
                                        <StatBar label="Variety" value={m.variety} color="bg-pink-500" />
                                        <StatBar label="Visual" value={m.visual} color="bg-cyan-500" />
                                        <StatBar label="Charisma" value={m.charisma} color="bg-rose-500" />
                                        <StatBar label="Intelligence" value={m.intelligence} color="bg-orange-500" />
                                        <hr className="my-1 border-dashed dark:border-gray-700"/>
                                        <StatBar label="Stamina" value={m.stamina} color="bg-gray-400" />
                                        <StatBar label="Stress" value={m.stress} color="bg-indigo-500" />
                                        <StatBar label="Morale" value={m.morale} color="bg-purple-500" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-center text-gray-500 dark:text-gray-400 p-8">No members have graduated yet.</p>
                            )}
                          </div>
                        )}
                  </div>
                )}
{/* ----- TRAINING TAB ----- */}
{currentTab === 'training' && (
  <div>
    <h2 className="text-xl font-bold mb-4 flex items-center"><Brain size={22} className="mr-2"/> Weekly Training Focus</h2>
    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
      Assign a training focus for each available member. Members will gain a small amount of experience in their chosen skill each week. This happens automatically during the "Next Week" cycle.
    </p>
        <div className="flex justify-center gap-2 my-4">
      <button 
        onClick={assignRandomTraining}
        className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
      >
        <Shuffle size={16} className="inline mr-2"/>
        Assign Random
      </button>
      <button 
        onClick={assignLowestSkillTraining}
        className="px-4 py-2 text-sm font-semibold bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors"
      >
        <TrendingUp size={16} className="inline mr-2"/>
        Train Lowest Skill
      </button>
    </div>

    <div className="space-y-2 max-w-2xl mx-auto">
      {getAllAvailableMembers(true).map(member => (
        <div key={member.rosterId || member.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm flex justify-between items-center border dark:border-gray-700">
          <div>
            <p className="font-bold">{member.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{getMemberGroupStatus(member)}</p>
          </div>
          <select
            value={member.trainingFocus || 'none'}
            onChange={(e) => handleSetTrainingFocus(member.id, e.target.value)}
            className="p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="singing">Vocal</option>
            <option value="dancing">Dance</option>
            <option value="variety">Variety</option>
            <option value="visual">Visual</option>
            <option value="charisma">Charisma</option>
            <option value="intelligence">Intelligence</option>
          </select>
        </div>
      ))}
       {getAllAvailableMembers(true).length === 0 && (
        <p className="text-center text-gray-500 p-8">No members available for training.</p>
      )}
    </div>
  </div>
)}

        {/* ----- MANAGEMENT TAB ----- */}
        {currentTab === 'management' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Recruitment & Auditions */}
        <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-base font-bold mb-2 flex items-center"><User size={18} className="mr-2"/> Recruitment & Auditions</h3>
          <div className="flex flex-col gap-1.5">
            
<button onClick={() => setShowModal('holdAudition')} className="w-full px-3 py-1.5 text-sm bg-green-600 text-white rounded font-semibold">
    <Plus size={16} className='inline mr-1'/> Hold Audition
</button>
<button onClick={startDraftKaigi} className="w-full px-3 py-1.5 text-sm bg-blue-600 text-white rounded font-semibold mt-1.5">
    <Users size={16} className='inline mr-1'/> Host Draft Kaigi (¥200k)
</button>


          </div>
        </div>

{/* Leadership */}
<div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <h3 className="text-base font-bold mb-2 flex items-center"><Shield size={18} className="mr-2"/> Leadership</h3>
    
    {/* Main Group Section */}
    <div className="flex flex-col gap-1.5 border-b pb-2 mb-2 dark:border-gray-700">
        <h4 className='font-semibold text-sm'>{groupName} Captain</h4>
        <p className="text-xs text-gray-500">Provides a passive bonus to all main group members.</p>
        <select 
            value={groupRoles['main'] || ''}
            onChange={(e) => appointCaptain('main', e.target.value)}
            className="w-full p-1.5 text-sm border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        >
<option key="captain-none" value="">-- Appoint a Captain --</option>
        {members.filter(m => m.isAvailable && !m.isSisterMember).sort((a,b) => (b.charisma + b.intelligence) - (a.charisma + a.intelligence)).map(member => (
            <option key={member.id} value={member.id}>{member.name}</option>
        ))}
        </select>
    </div>

    {/* Sister Groups Section */}
    {(sisterGroups || []).map(sg => (
        <div key={`captain-${sg.id}`} className="flex flex-col gap-1.5 mt-2">
            <h4 className='font-semibold text-sm'>{sg.name} Captain</h4>
            <select 
                value={groupRoles[sg.id] || ''}
                onChange={(e) => appointCaptain(sg.id, e.target.value)}
                className="w-full p-1.5 text-sm border rounded bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            >
                <option key="sg-captain-none" value="">-- Appoint a Captain --</option>

                {(sg.members || [])
                    .filter(m => m.isAvailable)
                    .sort((a,b) => (b.charisma + b.intelligence) - (a.charisma + a.intelligence))
                    .map(member => (
                        <option 
                            key={`sg-${sg.id}-${member.id}`} 
                            value={`sg-${sg.id}-${member.id}`}
                        >
                            {member.name}
                        </option>
                    ))

                }
            </select>
        </div>
    ))}

</div>


                      {/* Performance & Elections */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-base font-bold mb-2 flex items-center"><Star size={18} className="mr-2"/> Performance & Elections</h3>
              <div className="flex flex-col gap-1.5">
                <h4 className='font-semibold text-sm mt-1 mb-0.5 flex items-center'><Home size={16} className='mr-1 text-red-500'/> Theater Shows:</h4>
                <div className="flex items-center gap-2 mb-1">
                  <select 
                    value={selectedTheaterTeam || ''}
                    onChange={(e) => setSelectedTheaterTeam(e.target.value || null)}
                    className="flex-1 p-1.5 text-sm border rounded"
                    disabled={theaters.length === 0}
                  >
                    <option value="">All Available Members</option>
                    {sisterGroups.map(sg => (
                      <option key={`sg-${sg.id}`} value={`sg-${sg.id}`}>{sg.name} (Group)</option>
                    ))}
                    {(teams || []).map(team => {
                        const ownerName = team.groupId === 'main' ? groupName : (sisterGroups.find(sg => String(sg.id) === String(team.groupId))?.name || 'Unknown');
                        return <option key={team.id} value={team.id}>{team.name} ({ownerName})</option>;
                    })}
                  </select>
                </div>
                <button onClick={startTheaterShowPrep} className="w-full px-3 py-1.5 text-sm bg-green-500 text-white rounded disabled:bg-gray-400 font-semibold" disabled={theaters.length === 0 || !!activeTour}>
                  <Users size={16} className='inline mr-1'/> Hold Theater Show
                </button>
                
                <button onClick={startPerformancePrep} className="w-full p-1.5 text-sm bg-indigo-500 text-white rounded font-semibold" disabled={!!activeTour || songs.length === 0}>
                    <ClipboardCheck size={16} className='inline mr-1'/> Schedule Performance
                </button>
                
                <button onClick={() => setShowModal('majorConcert')} className="w-full p-1.5 text-sm bg-red-600 text-white rounded font-semibold" disabled={!!activeTour || songs.length === 0}>
                    <Trophy size={16} className='inline mr-1'/> Book Major Concert
                </button>

                <h4 className='font-semibold text-sm mt-2 mb-0.5'>Strategic Actions:</h4>

                <button onClick={startElectionCampaign} disabled={isCampaignActive} className="w-full p-1.5 text-sm bg-yellow-500 text-black rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Start Election Campaign (¥100k)
                </button>

                <button onClick={createElectionPosterForAll} disabled={!isCampaignActive} className="w-full p-1.5 text-sm bg-yellow-200 text-yellow-800 rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Create All Posters (¥5k/member)
                </button>

                        <button onClick={createAppealVideoForAll} disabled={!isCampaignActive} className="w-full p-1.5 text-sm bg-blue-200 text-blue-800 rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                            Create All Appeal Videos (¥20k/member)
                        </button>


                <div className="flex flex-col gap-1.5">
                    <button onClick={holdElection} disabled={isCampaignActive || electionVotePool <= 0} className="w-full p-1.5 text-sm bg-purple-500 text-white rounded font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed">
                        Hold Election (¥1m)
                    </button>
                    <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                        Vote Pool: {electionVotePool.toLocaleString()}
                    </p>

            <button onClick={startJankenTournament} className="w-full p-1.5 text-sm bg-green-700 text-white rounded font-semibold disabled:bg-gray-400 mt-2">
                Host Janken Tournament (¥75k)
            </button>

                </div>
                <button onClick={startTour} className="w-full p-1.5 text-sm bg-red-800 text-white rounded font-semibold" disabled={!!activeTour}>Start Tour (¥30k)</button>
              </div>

            </div>

            {/* Facilities */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-sm font-bold mb-2 flex items-center"><Building size={18} className="mr-2"/> Facilities</h3>
              <div className="flex flex-col gap-2">
                {/* Theater Management */}
                <h4 className="font-semibold text-sm mt-1 border-t pt-2">Theaters</h4>
                
                {theaters.map(theater => {
                    const ownerName = theater.owner === 'main' ? groupName : (sisterGroups.find(sg => sg.id === theater.owner)?.name || 'Unknown');
                    const cost = 100000 + (theater.level * 250000);
                    return (
                        <div key={theater.owner} className="p-1.5 border rounded bg-gray-50 dark:bg-gray-700">
                            <p className="font-bold text-sm">{theater.name} ({ownerName})</p>
                            <p className="text-xs">Level: {theater.level} | Capacity: {theater.capacity}</p>
                            <div className="flex gap-1 mt-1">
                                {theater.level < 5 ? (
                                    <button onClick={() => upgradeTheater(theater.owner)} className="flex-1 p-1 text-xs bg-purple-200 text-purple-800 rounded font-semibold">
                                        Upgrade (¥{cost.toLocaleString()})
                                    </button>
                                ) : (
                                    <p className="flex-1 text-xs text-center font-bold text-green-500 mt-1">Max Level</p>
                                )}
                                <button onClick={() => { setModalData(theater); setShowModal('renameTheater'); }} className="p-1 px-2 text-xs bg-yellow-400 text-black rounded font-semibold">
                                    Rename
                                </button>
                            </div>
                        </div>
                    );
                })}

                {!theaters.some(t => t.owner === 'main') && (
                    <button onClick={buildTheater} className="w-full p-1.5 text-sm bg-gray-700 text-white rounded font-semibold">
                        Build Main Theater (¥100k)
                    </button>
                )}
                
                {sisterGroups.filter(sg => !theaters.some(t => t.owner === sg.id)).map(sg => (
                     <button key={`build-th-${sg.id}`} onClick={() => buildSisterTheater(sg.id)} className="w-full p-1.5 text-sm bg-gray-600 text-white rounded font-semibold">
                        Build Theater for {sg.name} (¥150k)
                    </button>
                ))}

                {/* Practice Rooms */}
                <h4 className="font-semibold text-sm mt-2 border-t pt-2">Practice Rooms</h4>
                <button onClick={() => upgradePracticeRoom('vocal')} className="w-full p-1.5 text-sm bg-blue-100 text-blue-700 rounded flex justify-between items-center font-semibold">
                  <span>Upgrade Vocal Room (Lvl {buildings.practiceRooms.vocal})</span>
                  <span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.vocal * 15000).toLocaleString()}</span>
                </button>
                <button onClick={() => upgradePracticeRoom('dance')} className="w-full p-1.5 text-sm bg-green-100 text-green-700 rounded flex justify-between items-center font-semibold">
                  <span>Upgrade Dance Room (Lvl {buildings.practiceRooms.dance})</span>
                  <span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.dance * 15000).toLocaleString()}</span>
                </button>
                <button onClick={() => upgradePracticeRoom('variety')} className="w-full p-1.5 text-sm bg-pink-100 text-pink-700 rounded flex justify-between items-center font-semibold">
                  <span>Upgrade Variety Room (Lvl {buildings.practiceRooms.variety})</span>
                  <span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.variety * 15000).toLocaleString()}</span>
                </button>
                <button onClick={() => upgradePracticeRoom('visual')} className="w-full p-1.5 text-sm bg-cyan-100 text-cyan-700 rounded flex justify-between items-center font-semibold"><span>Upgrade Visual Room (Lvl {buildings.practiceRooms.visual})</span><span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.visual * 15000).toLocaleString()}</span></button>
                    <button onClick={() => upgradePracticeRoom('charisma')} className="w-full p-1.5 text-sm bg-rose-100 text-rose-700 rounded flex justify-between items-center font-semibold"><span>Upgrade Charisma Room (Lvl {buildings.practiceRooms.charisma})</span><span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.charisma * 15000).toLocaleString()}</span></button>
                    <button onClick={() => upgradePracticeRoom('intelligence')} className="w-full p-1.5 text-sm bg-orange-100 text-orange-700 rounded flex justify-between items-center font-semibold"><span>Upgrade Intelligence Room (Lvl {buildings.practiceRooms.intelligence})</span><span className='text-xs font-semibold'>¥{(25000 + buildings.practiceRooms.intelligence * 15000).toLocaleString()}</span></button>

              </div>
            </div>

            {/* Teams & Setlists */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-sm font-bold mb-2 flex items-center"><Users size={18} className="mr-2"/> Theater Teams & Setlists</h3>
              <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto mb-1.5">
                {(teams || []).map(team => (
                  <div key={team.id} className="p-1.5 border rounded bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                      <div>
                          <h4 className="font-semibold text-sm">{team.name} ({team.members.length} members)</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                              Setlist: {allSetlists.find(s => s.id === team.currentSetlistId)?.name || 'None'}
                          </p>
                      </div>
                      <div className="flex items-center gap-1">
                          <button onClick={() => showTeamDetails(team)} className="px-2 py-1 text-xs bg-blue-500 text-white rounded font-semibold hover:bg-blue-600">Details</button>
                          <button onClick={() => editTeam(team.id)} className="p-1.5 bg-yellow-400 text-white rounded hover:bg-yellow-500"><Edit size={16}/></button>
                      </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-1.5 mt-1.5">
                  <button onClick={createTeam} className="flex-1 p-1.5 text-sm bg-blue-500 text-white rounded font-semibold" disabled={theaters.length === 0}>
                    Create New Team
                  </button>

                    <button onClick={() => initiateShuffle()} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full mt-4 transition-all duration-200 ease-in-out shadow-lg border border-red-800">
                        <Shuffle size={16} className="inline-block mr-2" />
                        Initiate Grand Shuffle
                    </button>

                  <button onClick={createCustomSetlist} className="flex-1 p-1.5 text-sm bg-indigo-500 text-white rounded font-semibold" disabled={theaters.length === 0}>
                    <Plus size={16} className='inline mr-1'/> Custom Setlist
                  </button>
              </div>

            {/* --- NEW SETLIST DISPLAY AREA --- */}
            <div className="mt-3 border-t pt-2">
            <h4 className="font-semibold text-sm mb-1">Available Setlists:</h4>
            <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto">
                {/* Custom Setlists First */}
                {allSetlists.filter(s => s.isCustom).map(setlist => (
                    <div key={setlist.id} className="p-1.5 border rounded bg-indigo-50 dark:bg-gray-700 flex justify-between items-center">
                        <div>
                            <h4 className="font-semibold text-sm text-indigo-800 dark:text-indigo-300">{setlist.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Tracks: {setlist.tracks.length} | Theme: {setlist.theme} | Difficulty: {setlist.difficulty}
                            </p>
                        </div>
                        <button 
                            onClick={() => { setModalData(setlist); setShowModal('setlistDetails'); }}
                            className="px-2 py-1 text-xs bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
                        >
                            Details
                        </button>
                    </div>
                ))}
                {/* Default Setlists */}
                {allSetlists.filter(s => !s.isCustom).map(setlist => (
                <div key={setlist.id} className="p-1.5 border rounded bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                    <div>
                        <h4 className="font-semibold text-sm">{setlist.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Theme: {setlist.theme} | Difficulty: {setlist.difficulty}
                        </p>
                    </div>
                </div>
                ))}
            </div>
            </div>


            </div>
            {/* Groups Panel */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-sm font-bold mb-2 flex items-center"><Globe size={18} className="mr-2"/> Groups ({1 + sisterGroups.length})</h3>
              <div className="grid grid-cols-1 gap-1.5 max-h-40 overflow-y-auto mb-1.5">
                  {/* Main Group Card */}
                  <div className="p-1.5 border rounded bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-sm">{groupName} (Main)</span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Members: {members.length}</p>
                      </div>
                      <button 
                        onClick={() => { setModalData({ id: 'main', name: groupName }); setShowModal('editGroupName'); }}
                        className="p-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500">
                          Edit
                      </button>
                  </div>


                  {/* Sister Group Cards */}
                  {(sisterGroups || []).map(sg => (
                      <div key={sg.id} className="p-1.5 border rounded bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
                          <div>
                            <span className="font-semibold text-sm">{sg.name}</span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                <MapPin size={12} className='mr-1'/>{sg.location} | {(sg.members || []).length} Members | {sg.type === 'overseas' ? 'Overseas' : 'Domestic'}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => { setModalData(sg); setShowModal('editGroupName'); }}
                              className="p-1 bg-yellow-400 text-white rounded text-xs hover:bg-yellow-500">
                                Edit
                            </button>
                            <button 
                              onClick={() => { setModalData(sg); setShowModal('sisterGroupDisband'); }}
                              className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600">
                                Disband
                            </button>
                          </div>
                      </div>
                  ))}
              </div>
              <button onClick={() => setShowModal('createSisterGroup')} className="w-full p-1.5 text-sm bg-red-500 text-white rounded mt-1.5 font-semibold">
                Establish Sister Group (¥250k)
              </button>
            </div>

            {/* Push Member Management */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300 md:col-span-2">
              <h3 className="text-sm font-bold mb-2 flex items-center"><TrendingUp size={18} className="mr-2 text-green-500"/> Push Member Management</h3>
              <p className="text-xs text-gray-500 mb-2">Select members to receive a "push". Pushed members will receive a larger share of fans from group activities.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-900 rounded">
                {getMainGroupRoster().map(member => (
                  <div key={member.rosterId || member.id}>
                    <label className="flex items-center p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
                        <input 
                            type="checkbox"
                            checked={pushedMembers.map(String).includes(String(member.id))}
                            onChange={() => handleTogglePushMember(member.id)}
                            className="mr-2 form-checkbox h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm font-medium">{member.name}</span>
                    </label>
                  </div>
                ))}
                {getMainGroupRoster().length === 0 && <p className="text-gray-500 italic col-span-full text-center">Recruit members to select them for a push.</p>}
              </div>
            </div>


            {/* App Settings */}
            <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-sm font-bold mb-2 flex items-center"><Sparkles size={18} className="mr-2"/> App Settings</h3>
              <div className="flex flex-col gap-1.5">
                <button onClick={toggleDarkMode} className="w-full p-1.5 text-sm bg-gray-700 text-white rounded flex justify-center items-center font-semibold">
                  <Moon size={16} className="mr-2"/>
                  <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </button>
                <button onClick={() => setShowModal('cheatCode')} className="w-full p-1.5 text-sm bg-yellow-500 text-black rounded font-semibold">
                  Enter Cheat Code
                </button>
              </div>
            </div>
          </div>
        )}


{/* ----- DISCOGRAPHY TAB ----- */}
{currentTab === 'discography' && (() => {
    // A reusable component to display any release
    const ReleaseCard = ({ release }) => {
        const totalSales = (release.salesHistory || []).reduce((sum, entry) => sum + entry.sales, 0);
        const isAlbum = release.type === 'album';

        // Find all promotable B-sides
        const bSideTracks = !isAlbum ? (release.tracks || []).filter(t => t.type === 'b-side') : [];

        return (
            <div className={`p-3 rounded-lg shadow-sm flex flex-col bg-white dark:bg-gray-800 border ${isAlbum ? 'border-purple-300 dark:border-purple-700' : 'border-gray-200 dark:border-gray-700'}`}>
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        {isAlbum 
                            ? <Library size={24} className="text-purple-500 mr-3 flex-shrink-0" /> 
                            : <Music size={24} className="text-blue-500 mr-3 flex-shrink-0" />}
                        <div>
                            <h3 className="font-bold text-base flex items-center">
                                {release.name} (Wk {release.releaseWeek})
                                {release.chartWeeksLeft > 0 && <span className="ml-2 text-xs font-normal text-green-500 bg-green-100 dark:bg-green-900 dark:text-green-300 px-1.5 py-0.5 rounded-full">Charting</span>}
                            </h3>
                            <p className="text-xs text-gray-700 dark:text-gray-300">
                                {isAlbum ? 'Album' : 'Single'} | Total Sales: {totalSales.toLocaleString()} | Tracks: {release.tracks.length}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => { setModalData(release); setShowModal('releaseDetails'); }}
                        className="px-4 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 flex-shrink-0"
                    >
                        Details
                    </button>
                </div>

                {/* --- NEW B-SIDE PROMOTION SECTION --- */}
                {bSideTracks.length > 0 && release.chartWeeksLeft > 0 && (
                    <div className="border-t dark:border-gray-700 mt-2 pt-2 space-y-2">
                        <h4 className="font-semibold text-xs text-gray-500 dark:text-gray-400">B-SIDE PROMOTIONS:</h4>
                        {bSideTracks.map(track => (
                            <div key={track.name} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-md">
                                <div>
                                    <p className="font-bold text-sm">{track.name}</p>
                                    <p className="text-xs text-purple-600 dark:text-purple-400">{track.unitName}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        setModalData({ single: release, track: track });
                                        setShowModal('bsidePromotion');
                                    }}
                                    className="px-3 py-1 bg-purple-600 text-white text-xs rounded font-semibold hover:bg-purple-700"
                                >
                                    Promote Unit
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

        // Filter main group releases (now includes albums from the 'songs' list)
    const mainGroupReleases = (songs || [])
        .filter(s => 
            (s.targetGroup === 'main' || s.targetGroup === groupName) || // Catches singles
            s.artist === groupName                                      // Catches albums
        )
        .sort((a, b) => b.releaseWeek - a.releaseWeek);

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-base font-bold mb-2 text-gray-900 dark:text-gray-100">Discography</h2>
                <button onClick={createSong} className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md mb-2 flex items-center">
                    <Plus size={16} className="mr-1" /> Produce New Release
                </button>
                <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mt-1 mb-2">{groupName} Releases:</h3>
                <div className="space-y-2">
                    {mainGroupReleases.length > 0 ? mainGroupReleases.map(release => <ReleaseCard key={release.id} release={release} />) : <p className="text-xs text-gray-500">No releases yet for the main group.</p>}
                </div>
            </div>

            {(sisterGroups || []).map(sg => {
                // For each sister group, their releases are now all in their own `songs` array.
                const sgReleases = (sg.songs || []).sort((a, b) => b.releaseWeek - a.releaseWeek);
                
                if (sgReleases.length === 0) return null;
                
                return (
                    <div key={sg.id} className="pt-2 border-t border-gray-300 dark:border-gray-700">
                        <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 mt-1 mb-2">{sg.name} Releases:</h3>
                        <div className="space-y-2">
                            {sgReleases.map(release => <ReleaseCard key={release.id} release={release} />)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
})()}

{/* ----- HISTORY TAB ----- */}
{currentTab === 'history' && (
  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner">
    <h2 className="text-2xl font-bold mb-4">Group History</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Performance History */}
        <div>
            <h3 className="text-xl font-semibold mb-3 border-b-2 pb-2">Performance History</h3>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {(performanceHistory || []).map(p => (
                <div key={p.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{p.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                        {getFormattedDateForWeek(p.week)} | {p.category}
                        </p>
                  </div>
                  <button 
                    onClick={() => { setModalData(p); setShowModal('performanceDetails'); }}
                    className="px-3 py-1.5 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
                  >
                    Details
                  </button>
                </div>
              ))}
              {performanceHistory.length === 0 && <p className="text-gray-500 italic">No performances recorded yet.</p>}
            </div>
        </div>

        {/* Election History */}
        <div>
            <h3 className="text-xl font-semibold mb-3 border-b-2 pb-2">Election History</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {electionHistory.length > 0 ? (
                    [...electionHistory].reverse().map((event, index) => (
                        <button 
                            key={`election-${index}`} 
                            onClick={() => {
                                setModalData({ type: 'election', ...event });
                                setShowModal('historyDetail');
                            }}
                            className="w-full text-left p-3 bg-pink-300d dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                            <span className="font-bold">Week {event.week}:</span> General Election #{electionHistory.length - index}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No election history yet.</p>
                )}
            </div>
        </div>

        {/* Janken History */}
        <div>
            <h3 className="text-xl font-semibold mb-3 border-b-2 pb-2">Janken Tournament History</h3>
            <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {jankenHistory.length > 0 ? (
                    [...jankenHistory].reverse().map((event, index) => (
                        <button 
                            key={`janken-${index}`}
                            onClick={() => {
                                setModalData({ type: 'janken', ...event });
                                setShowModal('historyDetail');
                            }}
                            className="w-full text-left p-3 bg-pink-300 dark:bg-gray-700 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                            <span className="font-bold">Week {event.week}:</span> Janken Tournament #{jankenHistory.length - index}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-500 italic">No Janken tournament history yet.</p>
                )}
            </div>
        </div>

            {/* Shuffle History */}
            <div>
                <h3 className="text-xl font-semibold mb-3 border-b-2 pb-2">Shuffle History</h3>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {gameHistory.filter(e => e.type === 'Grand Shuffle').length > 0 ? (
                        gameHistory
                            .filter(e => e.type === 'Grand Shuffle')
                            .map((event, index, arr) => (
                            <button 
                                key={`shuffle-${index}`}
                                onClick={() => {
                                    setModalData({ type: 'Grand Shuffle', ...event });
                                    setShowModal('historyDetail');
                                }}
                                className="w-full text-left p-3 bg-blue-100 dark:bg-gray-700 rounded-lg shadow hover:bg-blue-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <span className="font-bold">Week {event.week}:</span> Grand Shuffle #{arr.length - index}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No shuffles have occurred yet.</p>
                    )}
                </div>
            </div>


            {/* Sports Festival History */}
            <div>
                <h3 className="text-xl font-semibold mb-3 border-b-2 pb-2">Sports Festival History</h3>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                    {sportsFestivalHistory.length > 0 ? (
                        [...sportsFestivalHistory].reverse().map((event, index) => (
                            <button
                                key={`sf-${index}`}
                                onClick={() => { setModalData(event); setShowModal('sportsFestivalResult'); }}
                                className="w-full text-left p-3 bg-red-100 dark:bg-gray-700 rounded-lg shadow hover:bg-red-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                <span className="font-bold">Week {event.week}:</span> Sports Festival #{sportsFestivalHistory.length - index}
                                <span className="block text-xs">Winner: {event.winningTeam} Team</span>
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">No sports festivals held yet.</p>
                    )}
                </div>
            </div>


    </div>
  </div>
)}


            {/* ----- ACTIVITIES TAB ----- */}
{currentTab === 'activities' && (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

        {/* Reputation Box */}
        <div className="md:col-span-1 p-3 rounded-lg shadow-md bg-pink-100 text-pink-900 border border-pink-200 flex flex-col">
            <div>
                <h3 className="text-lg font-bold mb-2">Group Reputation</h3>
                <div className="text-center">
                    <p className="text-5xl font-bold">{groupReputation}</p>
                    <p className="text-sm text-pink-700/80 mt-2">Your group's standing in the industry.</p>
                </div>
            </div>
            
            <details className="mt-4 text-xs">
                <summary className="cursor-pointer font-semibold text-pink-800 hover:text-pink-900">How to change Reputation...</summary>
                <div className="mt-2 pt-2 border-t border-pink-200/60">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <p className="font-bold text-green-700">Gain Reputation:</p>
                            <ul className="list-disc list-inside space-y-1 mt-1">
                                <li><span className="font-semibold text-green-600">+5</span> Million-selling single</li>
                                <li><span className="font-semibold text-green-600">+5</span> Sell out a Dome/Stadium</li>
                                <li><span className="font-semibold text-green-600">+3</span> 500k+ selling single</li>
                                <li><span className="font-semibold text-green-600">+3</span> Sell out a major Arena</li>
                                <li><span className="font-semibold text-green-600">+1</span> 100k+ selling single</li>
                            </ul>
                        </div>
                        <div>
                            <p className="font-bold text-red-700">Lose Reputation:</p>
                            <ul className="list-disc list-inside space-y-1 mt-1">
                                <li><span className="font-semibold text-red-600">-10</span> Decline Kouhaku invitation</li>
                                <li><span className="font-semibold text-red-600">-8</span> Failed scandal cover-up</li>
                                <li><span className="font-semibold text-red-600">-5</span> Forcibly disband sister group</li>
                                <li><span className="font-semibold text-red-600">-1 to -5</span> Handle scandal poorly</li>
                                <li><span className="font-semibold text-red-600">-2</span> Flop concert (&lt;50% attendance)</li>
                                <li><span className="font-semibold text-red-600">-1</span> Flop single (&lt;10k sales)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </details>
        </div>

    {/* Kouhaku Uta Gassen Panel */}
    <div className="md:col-span-1 p-3 rounded-lg shadow-md bg-red-800 text-white border-2 border-yellow-400 flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold mb-2 flex items-center">
                <Trophy size={20} className="mr-2 text-yellow-300"/> Kouhaku Uta Gassen
            </h3>
            <p className="text-sm mb-3">The nation's most prestigious year-end music festival. An invitation is a sign of immense success.</p>
            
            <div className="text-xs bg-black bg-opacity-20 p-2 rounded-md mb-3">
                <p className="font-bold mb-1">Eligibility Conditions:</p>
                <ul className="list-disc list-inside pl-1 space-y-0.5">
                    <li>Group Reputation: 50+</li>
                    <li>Total Fans: 1,000,000+</li>
                    <li>Recent Hit Single: 500,000+ sales</li>
                </ul>
            </div>
        </div>
        
        {kouhakuInvitationOffered && (
            <div className="mt-4">
                 <p className="text-center font-bold text-yellow-200 mb-2 animate-pulse">You have been invited!</p>
                 <button
                    onClick={acceptKouhakuInvitation}
                    className="w-full p-2 text-base bg-yellow-400 text-red-800 rounded font-bold hover:bg-yellow-300"
                >
                    Accept Invitation (Cost: ¥5,000,000)
                </button>
            </div>
        )}
    </div>

{/* Request Hour Panel */}
<div className="md:col-span-1 p-3 rounded-lg shadow-md bg-cyan-800 text-white border-2 border-cyan-400 flex flex-col justify-between">
    <div>
        <h3 className="text-lg font-bold mb-2 flex items-center">
            <BarChart3 size={20} className="mr-2 text-cyan-300"/> Request Hour Best 100
        </h3>
        <p className="text-sm mb-3">A yearly concert where fans vote for their favorite songs from the group's entire discography.</p>
        
        {requestHourStatus && requestHourStatus.isActive ? (
            <div className="text-center p-2 bg-black bg-opacity-30 rounded-lg">
                <p className="font-bold text-cyan-200 animate-pulse">VOTING ACTIVE</p>
                <p className="text-sm">Ends in: {requestHourStatus.endWeek - week} week(s)</p>
                <button 
                    onClick={() => setShowModal('requestHourVoting')}
                    className="mt-2 w-full p-1.5 text-sm bg-cyan-500 text-white rounded font-semibold"
                >
                    Cast Your Votes
                </button>
            </div>
        ) : (
            <div className="text-xs bg-black bg-opacity-20 p-2 rounded-md mb-3">
                <p>Host this major event to re-engage fans with older hits and discover which songs truly resonate. Costs ¥500,000.</p>
            </div>
        )}
    </div>
    
    {!(requestHourStatus && requestHourStatus.isActive) && (
        <div className="mt-4">
             <button
                onClick={startRequestHour}
                className="w-full p-2 text-base bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-colors"
            >
                Host Request Hour
            </button>
        </div>
    )}
</div>

            {/* Senbatsu Promotions - NEW PANEL */}
            <div className="p-2 rounded-lg shadow-md bg-yellow-50 dark:bg-gray-800 text-yellow-900 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-700 transition-colors duration-300 md:col-span-2">
                <h3 className="text-base font-bold mb-2 flex items-center"><Star size={18} className="mr-2 text-yellow-500"/> Senbatsu Promotions</h3>
                {(() => {
                    const allChartingSingles = [
                        ...songs.filter(s => s.type === 'single' && s.chartWeeksLeft > 0),
                        ...sisterGroups.flatMap(sg => (sg.songs || []).filter(s => s.type === 'single' && s.chartWeeksLeft > 0))
                    ];

                    if (allChartingSingles.length === 0) {
                        return <p className="text-xs text-center text-gray-500 dark:text-gray-400">No single is currently being promoted. Release a single to unlock these activities.</p>;
                    }

                    if (allChartingSingles.length === 1) {
                        const single = allChartingSingles[0];
                        const ownerName = single.targetGroup === 'main' ? groupName : single.targetGroup;
                        return (
                            <div className="flex flex-col gap-1.5">
                                <p className="text-xs text-center mb-1">Promoting: <strong>{single.name}</strong> ({ownerName})</p>
                                <button onClick={() => { setModalData({ single }); setShowModal('senbatsuPromotion'); }} className="w-full p-2 text-sm bg-yellow-500 text-white rounded font-semibold">
                                    <div className="flex justify-center items-center gap-1 font-semibold"><Tv size={16} /> Senbatsu Media Appearance</div>
                                    <span className="text-xs font-normal">High-impact activities for promoting Senbatsu members.</span>
                                </button>
                            </div>
                        );
                    }

                    const selectedSingleObject = allChartingSingles.find(s => String(s.id) === String(selectedSingleForPromo));

                    return (
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-center mb-1">Multiple singles are charting. Choose one to promote:</p>
                            <select
                                value={selectedSingleForPromo || ''}
                                onChange={(e) => setSelectedSingleForPromo(e.target.value)}
                                className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600"
                            >
                                {allChartingSingles.map(s => {
                                    const ownerName = s.targetGroup === 'main' ? groupName : s.targetGroup;
                                    return (
                                        <option key={s.id} value={s.id}>
                                            {s.name} ({ownerName}) - {s.chartWeeksLeft} wks left
                                        </option>
                                    );
                                })}
                            </select>
                            <button 
                                onClick={() => { 
                                    if (selectedSingleObject) {
                                        setModalData({ single: selectedSingleObject });
                                        setShowModal('senbatsuPromotion');
                                    }
                                }} 
                                disabled={!selectedSingleObject}
                                className="w-full p-2 text-sm bg-yellow-500 text-white rounded font-semibold disabled:bg-gray-400"
                            >
                                <div className="flex justify-center items-center gap-1 font-semibold"><Tv size={16} /> Senbatsu Media Appearance</div>
                                <span className="text-xs font-normal">High-impact activities for promoting Senbatsu members.</span>
                            </button>
                        </div>
                    );
                })()}
            </div>


        <div className="md:col-span-2 p-3 rounded-lg shadow-md bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-gray-900 dark:text-gray-100 border border-pink-200 dark:border-pink-800/50 transition-colors duration-300">
            <h3 className="text-base font-bold mb-2 flex items-center text-pink-800 dark:text-pink-200">
                <Users size={18} className="mr-2"/> Inter-Group Activities
            </h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <div>
                    <h4 className='font-semibold text-sm'>Propose Collaboration Single</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        A high-risk, high-reward venture with a rival group.
                        <br/>
                        Cost: ¥250,000 | Success based on your reputation.
                    </p>
                </div>
                <select
                    className="mt-2 md:mt-0 w-full md:w-auto p-2 text-sm border rounded-md bg-white dark:bg-gray-700 dark:border-gray-500 font-semibold text-pink-600 dark:text-pink-300 focus:ring-2 focus:ring-pink-400"
                    onChange={(e) => {
                        if (e.target.value) {
                            startCollaboration(e.target.value);
                            e.target.value = ""; // Reset dropdown
                        }
                    }}
                    value=""
                >
                    <option value="">-- Select a Rival --</option>
                {rivalGroups.map(rival => (
                    <option key={rival.id} value={rival.id}>{rival.name}</option>
                ))}
                </select>
            </div>

            {/* KENNIN RIVAL */}
<div className="flex flex-col md:flex-row md:items-center md:justify-between p-3 bg-white/50 dark:bg-black/20 rounded-lg mt-2">
    <div>
        <h4 className='font-semibold text-sm'>Request Exchange Student</h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Request a 1-year transfer of a rival's ace member.
            <br/>
            Cost: ¥1,000,000 | Success based on reputation.
        </p>
    </div>
    <select
        className="mt-2 md:mt-0 w-full md:w-auto p-2 text-sm border rounded-md bg-white dark:bg-gray-700 dark:border-gray-500 font-semibold text-purple-600 dark:text-purple-300 focus:ring-2 focus:ring-purple-400"
        onChange={(e) => {
            if (e.target.value) {
                startExchangeProgram(e.target.value);
                e.target.value = ""; // Reset dropdown after selection
            }
        }}
        value=""
        disabled={exchangeStudents.length > 0}
    >
        <option value="">{exchangeStudents.length > 0 ? 'Program Active' : '-- Select a Rival --'}</option>
{rivalGroups.map(rival => (
    <option key={rival.id} value={rival.id}>{rival.name}</option>
))}
    </select>
</div>
        </div>

    <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h3 className="text-base font-bold mb-2 flex items-center"><Hand size={18} className="mr-2"/> Fan Events</h3>
      <div className="flex flex-col gap-1.5">
        <button
          onClick={openHandshakeModal}
          disabled={!songs.some(s => s.includeHandshakeTickets && !s.handshakeEventHeld && s.chartWeeksLeft > 0)}
          className="w-full p-2 text-sm bg-green-500 text-white rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            <div className="flex justify-center items-center gap-1 font-semibold">
                <Hand size={16} /> Hold Post-Release Handshake Event
            </div>
            <span className="text-xs font-normal">
                {songs.find(s => s.includeHandshakeTickets && !s.handshakeEventHeld && s.chartWeeksLeft > 0)?.name || '(Requires a single with Handshake Tickets)'}
            </span>
        </button>

        <button onClick={() => setShowModal('sportsFestival')} className="w-full p-2 text-sm bg-red-500 text-white rounded">
            <div className="flex justify-center items-center gap-1 font-semibold"><Trophy size={16} /> Hold Sports Festival</div>
            <span className="text-xs font-normal">(¥150,000) - Boosts group-wide morale.</span>
        </button>


      </div>
    </div>
    


    <div className="p-2 rounded-lg shadow-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <h3 className="text-base font-bold mb-2 flex items-center"><Zap size={18} className="mr-2"/> Media & Training</h3>
      <div className="flex flex-col gap-1.5">
        <button 
          onClick={() => setShowModal('groupMediaJob')} 
          disabled={groupMediaJobDoneThisWeek}
          className="w-full p-2 text-sm bg-red-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <div className="flex justify-center items-center gap-1 font-semibold">
            <Tv size={16} /> {groupMediaJobDoneThisWeek ? 'Job Done This Week' : 'Group Media Appearance'}
          </div>
          <span className="text-xs font-normal">
            {groupMediaJobDoneThisWeek ? '(Available next week)' : '(¥20,000) - High impact, high member requirement.'}
          </span>
        </button>
        <button 
          onClick={() => setShowModal('mediaJob')} 
          disabled={mediaJobDoneThisWeek}
          className="w-full p-2 text-sm bg-blue-500 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <div className="flex justify-center items-center gap-1 font-semibold">
            <Mic size={16} /> {mediaJobDoneThisWeek ? 'Job Done This Week' : 'Send Member to Media Job'}
          </div>
          <span className="text-xs font-normal">
            {mediaJobDoneThisWeek ? '(Available next week)' : '(¥1,000) - Gain casual fans based on variety skill.'}
          </span>
        </button>
        <button onClick={() => setShowModal('trainingCamp')} className="w-full p-2 text-sm bg-purple-500 text-white rounded">
          <div className="flex justify-center items-center gap-1 font-semibold"><Brain size={16} /> Special Training Camp</div>
          <span className="text-xs font-normal">(¥75,000) - Send member away for 2 weeks for +15 skill.</span>
        </button>
      </div>
    </div>
  </div>


)}

            {/* ----- RIVALS TAB ----- */}
            {currentTab === 'rivals' && (
                <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold flex items-center">
                            <Globe size={22} className="mr-2 text-red-500"/> Rival Groups
                        </h2>
                        {activeChart && (
                            <button
                                onClick={() => setShowModal('dailyChart')}
                                className="px-3 py-1.5 text-sm bg-pink-600 hover:bg-pink-700 text-white rounded-md flex items-center"
                            >
                                <BarChart3 size={16} className="mr-2" /> View Daily Chart
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(rivalGroups || []).map(rival => (
                            <div key={rival.id} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 flex flex-col">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-red-500">{rival.name}</h3>
                                        <span className="text-xs font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full">{rival.archetype || 'Standard'}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Members: {rival.membersCount}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Fans: {rival.fans.toLocaleString()}</p>
                                    {rival.ace && (
                                        <p className="text-sm text-pink-600 dark:text-pink-400 font-semibold">
                                            Ace: {rival.ace.name} ({(rival.ace.fans || 0).toLocaleString()} fans)
                                        </p>
                                    )}
                                </div>
                                
                                <div className="mt-2 pt-2 border-t dark:border-gray-700">
                                    <h4 className="font-semibold text-xs mb-1">Recent Releases:</h4>
                                    <div className="max-h-24 overflow-y-auto text-xs space-y-1">
                                        {(rival.songs && rival.songs.length > 0) ? rival.songs.slice(-5).reverse().map(song => (
                                            <div key={song.name} className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                                                <p className="font-semibold">{song.name}</p>
                                                <p className="text-gray-500 dark:text-gray-400">Sales: {song.sales.toLocaleString()}</p>
                                            </div>
                                        )) : <p className="italic text-gray-500">No recent releases.</p>}
                                    </div>
                                </div>

                                <div className="mt-2 pt-2 border-t dark:border-gray-700">
                                    <h4 className="font-semibold text-xs mb-1">Activity Log:</h4>
                                    <div className="max-h-24 overflow-y-auto text-xs space-y-1">
                                        {(rival.history && rival.history.length > 0) ? rival.history.slice().reverse().map((log, index) => (
                                            <div key={index} className="p-1 bg-gray-100 dark:bg-gray-700 rounded">
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    <span className="font-semibold">Wk {log.week}:</span> {log.event}
                                                </p>
                                            </div>
                                        )) : <p className="italic text-gray-500">No recent activity.</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ----- MERCHANDISE TAB ----- */}
            {currentTab === 'merch' && (
                <MerchTab 
                    money={money}
                    merchInventory={merchInventory}
                    idolMerchInventory={idolMerchInventory}
                    eventMerchInventory={eventMerchInventory}
                    pendingMerch={pendingMerch}
                    merchTiers={merchTiers}
                    produceMerch={produceMerch}
                    warehouse={warehouse}
                    warehouseTiers={warehouseTiers}
                    upgradeWarehouse={upgradeWarehouse}
                    onlineStore={onlineStore}
                    upgradeOnlineStore={upgradeOnlineStore}
                    staff={staff}
                    staffTiers={staffTiers}
                    hireStaff={hireStaff}
                />
            )}
         </main>

          {/* Bottom Nav (Mobile) */}
          <nav className="lg:hidden flex bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-inner border-t border-gray-200 dark:border-gray-700">
            <TabButton id="members" label="Members" icon={Users} />
            <TabButton id="discography" label="Songs" icon={Music} />
            <TabButton id="management" label="Manage" icon={Building} />
            <TabButton id="history" label="History" icon={Clipboard} />\
            <TabButton id="rivals" label="Rivals" icon={Globe} />
            <TabButton id="activities" label="Activities" icon={Zap} />
            <TabButton id="training" label="Training" icon={Brain} />
            <TabButton id="merch" label="Merch" icon={ShoppingBag} />

          </nav>
        </div>

        {/* --- Right Column (Contextual) --- */}
        <aside className="w-full lg:w-96 flex flex-col bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {/* Main Stats */}
                  <div className="p-1 lg:p-4 border-b">
                    <h3 className="font-semibold text-sm mb-1">Group Status</h3>
                    <div className="flex items-center mb-0.5">
                      <DollarSign className="text-green-500 mr-1.5" size={14} />
                      <span className="text-xs lg:text-lg font-bold">¥{money.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center mb-0.5">
                      <Heart className="text-red-500 mr-1.5" size={14} />
                      <span className="text-xs lg:text-lg">{(totalFans || 0).toLocaleString()} Fans</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="text-blue-500 mr-1.5" size={14} />
                      <span className="text-xs lg:text-lg">{formattedDate}</span>
                    </div>

                    {/* --- MERCH BONUS DISPLAY --- */}
                    {merchDesignBonus && (
                      <div className="mt-2 text-xs text-center bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-1 rounded-lg">
                        <span>✨ Merch Cost: <strong>-{(merchDesignBonus.bonus * 100).toFixed(0)}%</strong> ({merchDesignBonus.memberName}, {merchDesignBonus.weeksLeft}w left)</span>
                      </div>
                    )}

 <button
                      onClick={activeTour ? progressTour : nextWeek}
                      className="w-full p-1 bg-blue-600 text-white rounded font-bold mt-2 hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {activeTour ? `Advance Tour (${activeTour.weeksLeft} Wk Left)` : 'Next Week'}
                    </button>
                  </div>
    {/* Member Detail Panel */}
    {showModal === 'memberDetails' && selectedMember && (
    <ModalWrapper title="Member Details" onBack={() => setShowModal('teamDetails')}>
        <div className="space-y-3 text-sm">
            <h3 className="text-xl font-bold">{selectedMember.name}</h3>
            
<div>
    <span className="font-semibold">Primary Team: </span>
    <span>{selectedMember.teamName}</span>
</div>
<div>
    <span className="font-semibold">Primary Group: </span>
    <span>
            {selectedMember.isSisterMember
                ? (selectedMember.homeGroup || 'Unknown')
                : groupName
            }
    </span>
</div>

{selectedMember.kennin && (
    <>
        <div className="pt-2 mt-2 border-t dark:border-gray-600">
            <span className="font-semibold">Concurrent Team: </span>
            <span className="bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-xs">
                {selectedMember.kennin.teamName}
            </span>
        </div>
        <div>
            <span className="font-semibold">Concurrent Group: </span>
            <span>
                {selectedMember.kennin.groupId === 'main'
                    ? groupName
                    : (sisterGroups.find(sg => String(sg.id) === String(selectedMember.kennin.groupId))?.name || 'Unknown')
                }
            </span>
        </div>
    </>
)}

            <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                    <p className="font-semibold">Morale</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${selectedMember.morale}%` }}></div>
                    </div>
                </div>
                <div>
                    <p className="font-semibold">Stress</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${selectedMember.stress}%` }}></div>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-base mt-3 mb-2 border-b pb-1">History</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                    {[...(selectedMember.teamHistory || [])].reverse().map((entry, index) => (
                        <div key={index}>
                            <p className="font-semibold">{entry.event}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Week {entry.week}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="flex justify-end mt-4 pt-2 border-t dark:border-gray-700">
            <button onClick={() => setShowModal('teamDetails')} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded font-semibold">Back to Team</button>
        </div>
    </ModalWrapper>
)}

{selectedMember ? (
  <div className="flex-1 overflow-y-auto p-4">
    <button 
      onClick={() => setSelectedMember(null)} 
      className="text-sm text-blue-500 mb-2 flex items-center"
    >
      <ChevronUp size={16}/> Back to all members
    </button>

    {/* Display Name */}
        {/* --- GRADUATION STATUS --- */}
        {selectedMember.isGraduating && selectedMember.graduationWeek ? (
            <p className="font-bold text-yellow-500 mb-2 flex items-center gap-2">
                <AlertCircle size={18} />
                Graduating in {selectedMember.graduationWeek - week} weeks
            </p>
        ) : (
            getGraduationRisk(selectedMember).text && (
                <p className={`font-bold ${getGraduationRisk(selectedMember).color} mb-2 flex items-center gap-2`}>
                    <AlertCircle size={18} />
                    {getGraduationRisk(selectedMember).text}
                </p>
            )
        )}

    {/* UPDATED: Member Status */}
    <p className="text-sm text-gray-600 mb-1">
      {getMemberGroupStatus(selectedMember)}
    </p>

    <p className="text-gray-600 mb-4">
    {`${selectedMember.generation ? `${selectedMember.generation} | ` : ''}${selectedMember.hometown} | ${selectedMember.personality} | ${selectedMember.nickname} | ${selectedMember.age} y.o.`}
    </p>

    {/* Stats */}
    <div className="mb-4">
      <StatBar label="Singing" value={selectedMember.singing} color="bg-blue-500" />
      <StatBar label="Dancing" value={selectedMember.dancing} color="bg-green-500" />
      <StatBar label="Variety" value={selectedMember.variety} color="bg-pink-500" />
      <StatBar label="Visual" value={selectedMember.visual} color="bg-cyan-500" />
      <StatBar label="Charisma" value={selectedMember.charisma} color="bg-rose-500" />
      <StatBar label="Intelligence" value={selectedMember.intelligence} color="bg-orange-500" />
      <StatBar label="Stamina" value={selectedMember.stamina} color={selectedMember.stamina < 30 ? "bg-red-500" : "bg-gray-400"} />
      <StatBar label="Stress" value={selectedMember.stress} color={selectedMember.stress > 70 ? "bg-yellow-500" : "bg-indigo-500"} />
      <StatBar label="Morale" value={selectedMember.morale} color="bg-purple-500" />

<div className="mt-3 text-sm border-t pt-3">
    <h4 className="font-semibold mb-2 flex items-center"><Users size={16} className="mr-2"/>Fan Base</h4>
    <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
        <span className="font-bold text-red-600 dark:text-red-400">Hardcore Fans</span>
        <span className="font-mono text-base font-bold text-red-700 dark:text-red-300">{(selectedMember.fans?.hardcore || 0).toLocaleString()}</span>
    </div>
    <div className="flex justify-between items-center p-2 mt-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <span className="font-bold text-blue-600 dark:text-blue-400">Casual Fans</span>
        <span className="font-mono text-base font-bold text-blue-700 dark:text-blue-300">{(selectedMember.fans?.casual || 0).toLocaleString()}</span>
    </div>
</div>
    </div>

    {/* Actions */}
    <h4 className="font-semibold mb-2">Actions</h4>
<div className="grid grid-cols-2 gap-2 mb-4">
    <button 
    onClick={() => trainMember(selectedMember.rosterId, "singing")} 
    className="p-2 bg-blue-100 text-blue-700 rounded text-sm"
    disabled={!selectedMember.isAvailable}
    >
    Train Vocal (¥500)
    </button>

    <button 
    onClick={() => trainMember(selectedMember.rosterId, "dancing")} 
    className="p-2 bg-green-100 text-green-700 rounded text-sm"
    disabled={!selectedMember.isAvailable}
    >
    Train Dance (¥500)
    </button>

    <button 
    onClick={() => trainMember(selectedMember.rosterId, "variety")} 
    className="p-2 bg-pink-100 text-pink-700 rounded text-sm"
    disabled={!selectedMember.isAvailable}
    >
    Train Variety (¥500)
    </button>
    
    <button onClick={() => trainMember(selectedMember.rosterId, 'visual')} className="p-2 bg-cyan-100 text-cyan-700 rounded text-sm" disabled={!selectedMember.isAvailable}>Train Visual (¥500)</button>
    <button onClick={() => trainMember(selectedMember.rosterId, 'charisma')} className="p-2 bg-rose-100 text-rose-700 rounded text-sm" disabled={!selectedMember.isAvailable}>Train Charisma (¥500)</button>
    <button onClick={() => trainMember(selectedMember.rosterId, 'intelligence')} className="p-2 bg-orange-100 text-orange-700 rounded text-sm" disabled={!selectedMember.isAvailable}>Train Intelligence (¥500)</button>

    <button 
    onClick={() => restMember(selectedMember.rosterId)} 
    className="p-2 bg-gray-200 text-gray-700 rounded text-sm"
    disabled={!selectedMember.isAvailable}
    >
    Rest
    </button>
</div>

    {isCampaignActive && (
        <>
            <h4 className="font-semibold mb-2 text-yellow-600 dark:text-yellow-400">Campaign Actions</h4>
            <div className="grid grid-cols-1 gap-2 mb-4">
                <button 
                    onClick={() => createElectionPoster(selectedMember.id)} 
                    className="p-2 bg-yellow-200 text-yellow-800 rounded text-sm font-semibold disabled:opacity-50"
                    disabled={!selectedMember.isAvailable}
                >
                    Create Election Poster (¥5k)
                </button>
            </div>
        </>
    )}

    {/* Center Actions - NEW SECTION */}
    {selectedMember.isCurrentCenter && (
      <>
        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Center Actions</h4>
        <div className="grid grid-cols-1 gap-2 mb-4">
            <button
                onClick={() => {
                    holdPressConference(selectedMember.id);
                }}
                className="p-2 bg-green-200 text-green-800 rounded text-sm font-semibold disabled:opacity-50"
                disabled={!songs.some(s => s.chartWeeksLeft > 0 && s.tracks.some(t => t.type === 'title' && (t.center || []).includes(String(selectedMember.id))))}
            >
                Hold Press Conference (¥50,000)
            </button>
        </div>
      </>
    )}



    {/* Manage */}
    <h4 className="font-semibold mb-2">Manage</h4>

    {/* --- NEW: Force Graduation Button --- */}
    {selectedMember.isGraduating && selectedMember.graduationWeek < week && (
        <button
            onClick={() => graduateMember(selectedMember.rosterId || selectedMember.id)}
            className="w-full p-2 bg-red-600 text-white rounded text-sm font-bold my-2 flex items-center justify-center gap-2"
        >
            <AlertCircle size={16} />
            Force Immediate Graduation (Fix)
        </button>
    )}
    {/* --- END NEW --- */}

    <button
                            onClick={() => beginActivity(selectedMember.id, 'design_merch')}
                            className="w-full mt-2 p-2 text-sm bg-teal-500 text-white rounded disabled:bg-gray-400"
                            disabled={!selectedMember.isAvailable}
                            title={!selectedMember.isAvailable ? `${selectedMember.name} is currently on another assignment.` : "Assign to help with merch design for one week."}
                        >
                            <Paintbrush size={16} className="inline mr-2" />
                            Help Design Merch (1 Week)
                        </button>

    {/* Idol-Specific Merchandise Production */}
    {(() => {
        const totalMemberFans = getTotalFansForMember(selectedMember);
        const isPopularEnough = totalMemberFans > 20000;

        if (selectedMember.isAvailable && isPopularEnough) {
            return (
                <div className="mt-4 border-t pt-4">
                    <h4 className="font-semibold mb-2 text-pink-600 dark:text-pink-400">Idol-Specific Merch</h4>
                    <p className="text-xs text-gray-500 mb-2">Unlocked due to high popularity! ({totalMemberFans.toLocaleString()} fans)</p>
                    <div className="grid grid-cols-1 gap-2">
                        {Object.entries(idolMerchTiers).map(([itemType, tierInfo]) => {
                            const inventoryKey = `${selectedMember.id}_${itemType}`;
                            const currentStock = idolMerchInventory[inventoryKey] || 0;
                            const cost = tierInfo.cost * 100;

                            return (
                                <div key={itemType} className="p-2 bg-pink-50 dark:bg-gray-800 rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-sm">{tierInfo.name}</span>
                                        <span className="text-xs font-mono">Stock: {currentStock}</span>
                                    </div>
                                    <button
                                        onClick={() => produceIdolMerch(selectedMember.id, itemType, 100)}
                                        className="w-full mt-1 p-1 text-sm bg-pink-500 text-white rounded disabled:bg-gray-400"
                                        disabled={money < cost}
                                    >
                                        Produce 100 (¥{cost.toLocaleString()})
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        return null;
    })()}


    <div className="grid grid-cols-2 gap-2 mb-4">
      <button 
        onClick={() => { setModalData(selectedMember); setShowModal("rename"); }} 
        className="p-2 bg-gray-200 text-gray-700 rounded text-sm"
      >
        Rename
      </button>

      <button 
        onClick={() => { setModalData(selectedMember); setShowModal("moveMember"); }} 
        className="p-2 bg-gray-200 text-gray-700 rounded text-sm"
      >
        Move/Kennin
      </button>

      <button 
        onClick={() => askAboutGraduation(selectedMember.id)}
        className="p-2 bg-yellow-200 text-yellow-800 rounded text-sm"
        disabled={selectedMember.isGraduating}
      >
        Ask Graduation
      </button>

      <button 
        onClick={() => { setModalData(selectedMember); setShowModal('graduationAnnouncement'); }}
        className="p-2 bg-red-200 text-red-700 rounded text-sm"
        disabled={!selectedMember.isAvailable || selectedMember.isGraduating}
      >
        Graduate
      </button>
    </div>

{/* Chemistry */}
<div className="mt-3 text-sm border-t pt-3">
    <h4 className="font-semibold mb-2 flex items-center"><Users size={16} className="mr-2"/>Chemistry</h4>
    {(() => {
        const chemistry = selectedMember.chemistry || {};
        const relationships = Object.entries(chemistry)
            .map(([id, score]) => ({ id, score, member: getMemberById(id) }))
            .filter(r => r.member) // Ensure member exists
            .sort((a, b) => b.score - a.score);

        const goodRelations = relationships.filter(r => r.score > 10).slice(0, 3);
        const badRelations = relationships.filter(r => r.score < -10).reverse().slice(0, 3);

        if (goodRelations.length === 0 && badRelations.length === 0) {
            return <p className="text-xs text-gray-500 italic">No significant relationships yet.</p>
        }

        return (
            <div className="space-y-1">
                {goodRelations.length > 0 && (
                    <div className="p-2 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="font-bold text-green-600 dark:text-green-400 text-xs mb-1">Good Chemistry</p>
                        {goodRelations.map(rel => (
                            <div key={rel.id} className="flex justify-between items-center text-xs">
                                <span>{rel.member.name}</span>
                                <span className="font-mono font-bold text-green-700 dark:text-green-300">+{Math.round(rel.score)}</span>
                            </div>
                        ))}
                    </div>
                )}
                {badRelations.length > 0 && (
                     <div className="p-2 bg-red-50 dark:bg-red-900/30 rounded-lg mt-1">
                        <p className="font-bold text-red-600 dark:text-red-400 text-xs mb-1">Bad Chemistry</p>
                        {badRelations.map(rel => (
                            <div key={rel.id} className="flex justify-between items-center text-xs">
                                <span>{rel.member.name}</span>
                                <span className="font-mono font-bold text-red-700 dark:text-red-300">{Math.round(rel.score)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    })()}
</div>

{/* Goals & Ambition */}
<div className="mt-3 text-sm border-t pt-3">
    <h4 className="font-semibold mb-2 flex items-center"><Goal size={16} className="mr-2"/>Goals & Ambition</h4>
    <div className="space-y-1">
            <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg" title={ambitions[selectedMember.ambition]?.description || ''}>
                <span className="font-bold text-gray-600 dark:text-gray-400">Ambition</span>
                <span className="text-sm text-right text-gray-800 dark:text-gray-300">
                    {selectedMember.ambition}
                </span>
            </div>
        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
            <span className="font-bold text-gray-600 dark:text-gray-400">Graduation Window</span>
            <span className="text-sm text-right text-gray-800 dark:text-gray-300">
                {selectedMember.graduationWindow.min}-{selectedMember.graduationWindow.max} years
            </span>
        </div>
        <div className="flex justify-between items-center p-2 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <span className="font-bold text-red-600 dark:text-red-400">Graduation Urgency</span>
            <span className="font-mono text-base font-bold text-red-700 dark:text-red-300">{Math.round(selectedMember.graduationUrgency || 0)}/100</span>
        </div>
    </div>
</div>


<MemberParticipationHistory member={selectedMember} getFormattedDateForWeek={getFormattedDateForWeek} />
  </div>
) : (

/* Side Panel Tabs (Desktop) */
<div className="hidden lg:flex flex-col flex-1">
  <nav className="flex border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
    {[
      { id: 'members', label: 'Members' },
      { id: 'management', label: 'Manage' },
      { id: 'activities', label: 'Activities' },
      { id: 'training', label: 'Training' },
      { id: 'discography', label: 'Songs' },
      { id: 'merch', label: 'Merch' },
      { id: 'history', label: 'History' },
      { id: 'rivals', label: 'Rivals' },
    ].map(tab => (
      <button
        key={tab.id}
        onClick={() => setCurrentTab(tab.id)}
        className={`flex-1 p-3 text-sm font-medium transition-all duration-200 rounded-t-md
          ${
            currentTab === tab.id
              ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
              : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
      >
        {tab.label}
      </button>
    ))}
  </nav>

  <div className="p-4 text-center text-gray-600 dark:text-gray-400 flex-1 flex flex-col justify-center items-center">
    <User size={48} className="mx-auto mb-4" />
    <p>Select a member or navigate the tabs above.</p>
    <p className="text-xs mt-4 text-gray-400">
    </p>
  </div>
</div>
          )}

          {/* Notifications Panel */}
          {showNotifications && (
              <div className="p-4 border-t max-h-48 overflow-y-auto">
                  <h4 className="font-semibold mb-2 flex items-center justify-between">Notifications ({notifications.length}) <button onClick={() => setNotifications([])} className='text-red-400'><Trash2 size={16}/></button></h4>
                  <div className="space-y-2 text-sm">
                      {notifications.length === 0 && <p className='text-gray-500'>No new notifications.</p>}
                      {(notifications || []).map(n => (
                          <div key={n.id} className="p-2 bg-gray-100 rounded">
                              <span className="font-bold">{n.title}</span> - <span className='text-gray-700'>{n.content}</span>
                              <span className="text-xs text-gray-500 block">Week {n.week}</span>
                          </div>
                      ))}
                  </div>
              </div>
          )}
        </aside>

        {/* Modals */}
        {showModal === 'holdAudition' && <HoldAuditionModal 
            startAudition={startAudition} 
            groupName={groupName} 
            sisterGroups={sisterGroups} 
            setShowModal={setShowModal} 
        />}
        {showModal === 'traineeDraft' && <TraineeDraftModal 
            auditionCandidates={auditionCandidates}
            modalData={modalData}
            confirmRecruitment={confirmRecruitment}
            setShowModal={setShowModal}
        />}
        {showModal === 'createSong' && <CreateSongModal />}
        {showModal === 'releaseDetails' && <ReleaseDetailsModal />}
        {showModal === 'theaterSelection' && <TheaterSelectionModal />}
        {showModal === 'rename' && modalData && <RenameMemberModal />}
        {showModal === 'moveMember' && <MoveMemberModal member={modalData} setShowModal={setShowModal} />}
        {showModal === 'createTeam' && <TeamManagementModal isEditing={false} />}
        {showModal === 'editTeam' && modalData && <TeamManagementModal isEditing={true} team={modalData} />}
        {showModal === 'teamDetails' && modalData && <TeamDetailsModal team={modalData} />}
        {showModal === 'confirm' && modalData && <ConfirmModal />}
        {showModal === 'shuffleModeSelection' && <ShuffleModeSelectionModal />}
        {showModal === 'shuffleResult' && modalData && <ShuffleResultModal />}
        {showModal === 'manualShuffle' && <ManualShuffleModal />}
        {showModal === 'saveGame' && <SaveGameModal />}
        {showModal === 'loadGame' && <LoadGameModal />}
        {showModal === 'handshakeSelection' && <HandshakeSelectionModal />}
        {showModal === 'handshakeResult' && <HandshakeEventResultModal />}
        {showModal === 'mediaJob' && <MediaJobModal />}
        {showModal === 'groupMediaJob' && <GroupMediaModal />}
        {showModal === 'trainingCamp' && <TrainingCampModal />}
        {showModal === 'createSisterGroup' && <CreateSisterGroupModal />}
        {showModal === 'customSetlist' && <CustomSetlistModal />}
        {showModal === 'setlistDetails' && modalData && <SetlistDetailsModal setlist={modalData} allTheaterSongs={theaterSongs} getFormattedDateForWeek={getFormattedDateForWeek} />}
        {showModal === 'sisterGroupDisband' && modalData && <SisterGroupDisbandModal />}
        {showModal === 'exchangeStudent' && <ExchangeStudentModal />}
        {showModal === 'editGroupName' && modalData && <EditGroupNameModal />}
        {showModal === 'performancePrep' && <PerformanceModal />}
        {showModal === 'majorConcert' && (
    <MajorConcertModal
        onConfirm={holdMajorConcert}
        onCancel={() => setShowModal(null)}
        venues={venues}
        members={getAllAvailableMembers(true)}
        produceEventMerch={produceEventMerch}
        eventMerchInventory={eventMerchInventory}
        eventMerchTiers={eventMerchTiers}
    />
)}
        {showModal === 'performanceDetails' && <PerformanceDetailsModal />}
        {showModal === 'performanceResult' && <PerformanceResultModal />}
        {showModal === 'handshakeResult' && <HandshakeEventResultModal />}
        {showModal === 'renameTheater' && <RenameTheaterModal />}
        {showModal === 'cheatCode' && <CheatCodeModal />}
        {showModal === 'graduationAnnouncement' && <GraduationAnnouncementModal />}
        {showModal === 'graduationPath' && <GraduationPathModal />}
        {showModal === 'graduationTalk' && <GraduationTalkModal />}
        {showModal === 'electionSummary' && <ElectionSummaryModal 
            modalData={modalData} 
            onHide={() => setShowModal(null)}
            getMemberGroupStatus={getMemberGroupStatus}
            groupName={groupName}
            sisterGroups={sisterGroups}
        />}
        {showModal === 'electionResult' && <ElectionResultModal />}
        {showModal === 'annualAwardsResult' && <AnnualAwardsResultModal />}
        {showModal === 'dailyChart' && <DailyChartModal activeChart={activeChart} onHide={() => setShowModal(null)} groupName={groupName} songs={songs} sisterGroups={sisterGroups} />}
        {showModal === 'scandalDecision' && <ScandalDecisionModal />}
        {showModal === 'scandalResult' && <ScandalResultModal />}
        {showModal === 'senbatsuPromotion' && <SenbatsuPromotionModal />}
        {showModal === 'bsidePromotion' && <BsidePromotionModal />}
        {showModal === 'bsidePromotionResult' && <BsidePromotionResultModal />}
        {showModal === 'jankenTournament' && <JankenTournamentModal />}
        {showModal === 'historyDetail' && <HistoryDetailModal />}
        {showModal === 'jankenResult' && <JankenResultModal />}
        {showModal === 'kouhakuResult' && <KouhakuResultModal />}
        {showModal === 'kouhakuInvite' && <KouhakuInvitationModal />}
        {showModal === 'kouhakuPrep' && <KouhakuPreparationModal />}
        {showModal === 'senbatsuPromotionResult' && <SenbatsuPromotionResultModal />}
        {showModal === 'requestHourVoting' && <RequestHourVotingModal />}
        {showModal === 'requestHourResult' && <RequestHourResultModal />}
        {showModal === 'sportsFestival' && <SportsFestivalModal />}
        {showModal === 'sportsFestivalResult' && <SportsFestivalResultModal />}
        {showModal === 'liveSportsFestival' && <LiveSportsFestivalModal />}
        {showModal === 'draftKaigi' && (
            <DraftKaigiModal 
                draftKaigi={draftKaigi} 
                advanceDraftStage={advanceDraftStage}
                handlePlayerDraftPick={handlePlayerDraftPick}
                handleAiDraftPick={handleAiDraftPick}
                finishDraft={finishDraft}
            />
        )}

        </div>
    );
};

export default App;