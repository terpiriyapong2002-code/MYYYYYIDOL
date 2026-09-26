// @ts-nocheck
import React, { useState, useMemo } from 'react';

export const BlockbusterModals = ({
    showModal, setShowModal, modalData, activeBlockbuster, blockbusterHistory,
    blockbusterThemes, blockbusterScales, blockbusterDirectors, boxOfficeMilestones,
    startBlockbusterProduction, allMembers, songs, money, groupReputation, getMemberById,
}) => {
    const themeKeys = Object.keys(blockbusterThemes || {});
    const [selectedThemeKey, setSelectedThemeKey] = useState(themeKeys[0] || 'majisuka_musical');
    const [selectedScaleKey, setSelectedScaleKey] = useState('flagship');
    const [selectedDirectorKey, setSelectedDirectorKey] = useState('indie_visionary');
    const [customTitle, setCustomTitle] = useState('');
    const [selectedOstSongId, setSelectedOstSongId] = useState('');
    const [leadId, setLeadId] = useState('');
    const [deuteragonistId, setDeuteragonistId] = useState('');
    const [villainId, setVillainId] = useState('');
    const [ensembleIds, setEnsembleIds] = useState([]);

    const activeTheme = blockbusterThemes[selectedThemeKey] || {};
    const activeScale = blockbusterScales[selectedScaleKey] || {};
    const activeDirector = blockbusterDirectors[selectedDirectorKey] || {};
    const availableMembers = useMemo(() => (allMembers || []).filter(m => m && m.isAvailable !== false), [allMembers]);

    const calcFit = (member, roleType) => {
        if (!member || !activeTheme) return 0;
        const cs = activeTheme.coreStats || ['charisma', 'visual', 'singing'];
        let s = cs.reduce((a, st) => a + ((st === 'singing') ? (member.vocal || 50) : (member[st] || 50)), 0) / cs.length;
        if (roleType === 'lead') s += ((member.charisma || 50) + (member.visual || 50)) / 10;
        else if (roleType === 'villain') s += ((member.intelligence || 50) + (member.charisma || 50)) / 10;
        return Math.min(99, Math.max(20, Math.round(s)));
    };

    const toggleEnsemble = id => {
        if (ensembleIds.includes(id)) setEnsembleIds(p => p.filter(x => x !== id));
        else if (ensembleIds.length < 6) setEnsembleIds(p => [...p, id]);
    };

    const totalCost = (activeScale.productionCost || 0) + (activeDirector.cost || 0);
    const isAlreadyActive = activeBlockbuster && activeBlockbuster.status !== 'completed';
    const canLaunch = money >= totalCost && groupReputation >= (activeTheme.reputationReq || 0)
        && leadId && deuteragonistId && villainId && ensembleIds.length >= 1 && !isAlreadyActive;

    const handleLaunch = () => canLaunch && startBlockbusterProduction(
        selectedThemeKey, selectedScaleKey, selectedDirectorKey,
        { lead: leadId, deuteragonist: deuteragonistId, villain: villainId, ensemble: ensembleIds },
        selectedOstSongId || null, customTitle
    );
    // ---- MODAL 1: PRODUCTION PLANNER ----
    if (showModal === 'blockbusterProduction') {
        return (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-2 overflow-y-auto">
                <div className="bg-slate-900 border border-amber-500/40 text-slate-100 rounded-2xl max-w-5xl w-full p-5 shadow-2xl space-y-5 my-4">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                        <div>
                            <h2 className="text-xl font-black text-amber-400">🎬 Annual Musical &amp; Blockbuster Production</h2>
                            <p className="text-xs text-slate-400">Cast your idols, pick a director, attach an OST, and dominate the Box Office.</p>
                        </div>
                        <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800">✕</button>
                    </div>

                    {/* Active blockbuster warning */}
                    {isAlreadyActive && (
                        <div className="p-3 bg-red-900/40 border border-red-500/50 rounded-xl text-sm text-red-300">
                            Active production: <strong>{activeBlockbuster.title}</strong> ({activeBlockbuster.status}). Complete it before starting a new one.
                        </div>
                    )}

                    {/* STEP 1: Theme */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-amber-400">1. Production Theme</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                            {Object.entries(blockbusterThemes).map(([key, theme]) => {
                                const isLocked = groupReputation < (theme.reputationReq || 0);
                                return (
                                    <div key={key} onClick={() => !isLocked && setSelectedThemeKey(key)}
                                        className={`p-3 rounded-xl border cursor-pointer transition ${selectedThemeKey === key ? 'bg-amber-950/50 border-amber-400 ring-2 ring-amber-500/40' : isLocked ? 'opacity-50 border-slate-800 cursor-not-allowed' : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'}`}>
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${theme.type === 'musical' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>{theme.type === 'musical' ? 'Musical' : 'Movie'}</span>
                                            {theme.reputationReq > 0 && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-700 text-slate-300">Rep {theme.reputationReq}+</span>}
                                        </div>
                                        <h4 className="font-bold text-sm leading-tight">{theme.name}</h4>
                                        <p className="text-[9px] text-amber-300">{theme.genre}</p>
                                        <p className="text-[9px] text-slate-400 line-clamp-2 mt-1">{theme.tagline}</p>
                                        <div className="mt-1.5 pt-1 border-t border-slate-700/60 text-[8px] text-slate-500">Core: {theme.coreStats?.join(', ')}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* STEP 2: Scale & Director */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-amber-400">2. Production Scale</label>
                            {Object.entries(blockbusterScales).map(([key, scale]) => (
                                <div key={key} onClick={() => setSelectedScaleKey(key)}
                                    className={`p-3 rounded-xl border cursor-pointer ${selectedScaleKey === key ? 'bg-amber-950/40 border-amber-400' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-sm">{scale.name}</span>
                                        <span className="text-xs text-amber-400 font-black">¥{scale.productionCost.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 mt-1">{scale.description}</p>
                                    <div className="flex gap-3 text-[9px] text-slate-400 mt-1">
                                        <span>Rehearsal: <b className="text-slate-300">{scale.rehearsalWeeks}wks</b></span>
                                        <span>Run: <b className="text-slate-300">{scale.theatricalWeeks}wks</b></span>
                                        <span className="text-green-400">¥{(scale.boxOfficePotential.min / 1e6).toFixed(0)}M–¥{(scale.boxOfficePotential.max / 1e6).toFixed(0)}M</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-amber-400">3. Director</label>
                            {Object.entries(blockbusterDirectors).map(([key, director]) => (
                                <div key={key} onClick={() => setSelectedDirectorKey(key)}
                                    className={`p-3 rounded-xl border cursor-pointer ${selectedDirectorKey === key ? 'bg-purple-950/40 border-purple-400' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}>
                                    <div className="flex justify-between">
                                        <span className="font-bold text-sm">{director.name}</span>
                                        <span className="text-xs text-purple-400 font-black">¥{director.cost.toLocaleString()}</span>
                                    </div>
                                    <p className="text-[9px] text-slate-400 mt-1">{director.style}</p>
                                    <div className="flex gap-3 text-[9px] mt-1">
                                        <span className="text-amber-300">+{director.criticBoost} Critic</span>
                                        <span className="text-green-300">×{director.boxOfficeMultiplier} Box Office</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* STEP 3: Role Casting */}
                    {activeTheme.leadRoleName && (
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase text-amber-400">4. Role Casting</label>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="p-3 bg-slate-800 border border-amber-500/50 rounded-xl space-y-1.5">
                                    <div className="text-xs font-black text-amber-400">⭐ Lead Star</div>
                                    <p className="text-[9px] text-slate-400">{activeTheme.leadRoleName}</p>
                                    <select value={leadId} onChange={e => setLeadId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200">
                                        <option value="">Choose Lead...</option>
                                        {availableMembers.filter(m => m.rosterId !== deuteragonistId && m.rosterId !== villainId && !ensembleIds.includes(m.rosterId))
                                            .sort((a, b) => calcFit(b, 'lead') - calcFit(a, 'lead'))
                                            .map(m => <option key={m.rosterId} value={m.rosterId}>{m.name} ({calcFit(m, 'lead')}%)</option>)}
                                    </select>
                                </div>
                                <div className="p-3 bg-slate-800 border border-purple-500/50 rounded-xl space-y-1.5">
                                    <div className="text-xs font-black text-purple-400">✨ Rival / Co-Lead</div>
                                    <p className="text-[9px] text-slate-400">{activeTheme.deuteragonistRoleName}</p>
                                    <select value={deuteragonistId} onChange={e => setDeuteragonistId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200">
                                        <option value="">Choose Co-Lead...</option>
                                        {availableMembers.filter(m => m.rosterId !== leadId && m.rosterId !== villainId && !ensembleIds.includes(m.rosterId))
                                            .sort((a, b) => calcFit(b, 'deuteragonist') - calcFit(a, 'deuteragonist'))
                                            .map(m => <option key={m.rosterId} value={m.rosterId}>{m.name} ({calcFit(m, 'deuteragonist')}%)</option>)}
                                    </select>
                                </div>
                                <div className="p-3 bg-slate-800 border border-red-500/50 rounded-xl space-y-1.5">
                                    <div className="text-xs font-black text-red-400">🔥 Antagonist</div>
                                    <p className="text-[9px] text-slate-400">{activeTheme.villainRoleName}</p>
                                    <select value={villainId} onChange={e => setVillainId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200">
                                        <option value="">Choose Villain...</option>
                                        {availableMembers.filter(m => m.rosterId !== leadId && m.rosterId !== deuteragonistId && !ensembleIds.includes(m.rosterId))
                                            .sort((a, b) => calcFit(b, 'villain') - calcFit(a, 'villain'))
                                            .map(m => <option key={m.rosterId} value={m.rosterId}>{m.name} ({calcFit(m, 'villain')}%)</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-xs font-bold">Ensemble / Chorus ({ensembleIds.length}/6)</span>
                                    <span className="text-[9px] text-slate-400">{activeTheme.ensembleRoleName}</span>
                                </div>
                                <div className="grid grid-cols-4 md:grid-cols-6 gap-1.5 max-h-24 overflow-y-auto">
                                    {availableMembers.filter(m => m.rosterId !== leadId && m.rosterId !== deuteragonistId && m.rosterId !== villainId).map(m => (
                                        <button key={m.rosterId} type="button" onClick={() => toggleEnsemble(m.rosterId)}
                                            className={`p-1.5 rounded-lg text-[9px] transition border ${ensembleIds.includes(m.rosterId) ? 'bg-amber-500 text-black font-bold border-amber-400' : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:bg-slate-800'}`}>
                                            {m.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 4: OST + Title */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-amber-400">5. OST / Theme Song (Optional)</label>
                            <select value={selectedOstSongId} onChange={e => setSelectedOstSongId(e.target.value)} className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200">
                                <option value="">No OST / Generic Score</option>
                                {(songs || []).map(s => <option key={s.id} value={s.id}>{s.title || s.name} (Sales: {(s.sales || 0).toLocaleString()})</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-amber-400">Custom Title (Optional)</label>
                            <input type="text" value={customTitle} onChange={e => setCustomTitle(e.target.value)} placeholder={activeTheme.name || 'Leave blank for default'} className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 text-slate-200" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div>
                            <div className="text-sm font-bold">Budget: <span className="text-amber-400 font-black">¥{totalCost.toLocaleString()}</span></div>
                            <div className="text-xs text-slate-400">Balance: <span className={money >= totalCost ? 'text-green-400' : 'text-red-400'}>¥{money.toLocaleString()}</span>
                                {groupReputation < (activeTheme.reputationReq || 0) && <span className="ml-2 text-red-400">Needs Rep {activeTheme.reputationReq}+</span>}
                            </div>
                        </div>
                        <div className="flex space-x-3 w-full sm:w-auto">
                            <button type="button" onClick={() => setShowModal(null)} className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold">Cancel</button>
                            <button type="button" disabled={!canLaunch} onClick={handleLaunch}
                                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition shadow-xl ${canLaunch ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 hover:brightness-110' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}>
                                🎬 Greenlight Production
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ---- MODAL 2: PREMIERE GALA ----
    if (showModal === 'blockbusterPremiere' && modalData?.blockbuster) {
        const bb = modalData.blockbuster;
        const criticScore = modalData.criticScore ?? bb.criticScore ?? 85;
        const audienceScore = modalData.audienceScore ?? bb.audienceScore ?? 88;
        const grade = modalData.grade ?? bb.audienceGrade ?? 'A';
        const criticVerdict = modalData.criticVerdict ?? bb.criticVerdict ?? 'Fresh';
        const criticQuotes = modalData.criticQuotes ?? bb.criticQuotes ?? [];
        const openingWeekend = modalData.openingWeekend ?? bb.openingWeekendGross ?? 0;
        const premiereFans = modalData.premiereFans ?? 0;

        return (
            <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-lg flex items-center justify-center p-4">
                <div className="bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border-2 border-amber-400 text-slate-100 rounded-3xl max-w-2xl w-full p-7 shadow-2xl space-y-5">
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center space-x-2 px-4 py-1 bg-amber-500/20 border border-amber-400/40 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest">
                            ✨ Red Carpet Opening Night Gala ✨
                        </div>
                        <h2 className="text-2xl font-black bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">{bb.title}</h2>
                        <p className="text-xs text-amber-300/80">{bb.type === 'musical' ? '🎭 Stage Musical' : '🎬 Blockbuster Film'} — Directed by {bb.directorName}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-center">
                            <div className="text-[9px] text-slate-400 uppercase font-bold mb-1">🍅 Critics</div>
                            <div className="text-3xl font-black text-red-400">{criticScore}%</div>
                            <div className="text-[9px] text-amber-300 font-semibold">{criticVerdict}</div>
                        </div>
                        <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-2xl text-center">
                            <div className="text-[9px] text-slate-400 uppercase font-bold mb-1">💜 Audience</div>
                            <div className="text-3xl font-black text-pink-400">{grade}</div>
                            <div className="text-[9px] text-slate-300">{audienceScore}% approval</div>
                        </div>
                        <div className="p-3 bg-slate-800/80 border border-amber-500/40 rounded-2xl text-center">
                            <div className="text-[9px] text-slate-400 uppercase font-bold mb-1">💰 Opening</div>
                            <div className="text-xl font-black text-green-400">¥{(openingWeekend / 1e6).toFixed(1)}M</div>
                            <div className="text-[9px] text-amber-300">#1 Box Office</div>
                        </div>
                    </div>
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
                        <div className="text-[9px] font-bold text-amber-400 uppercase tracking-wider">📰 Press Reactions</div>
                        {criticQuotes.map((q, i) => <p key={i} className="text-xs text-slate-300 italic">&ldquo;{q}&rdquo;</p>)}
                    </div>
                    <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-3">
                        <div>
                            <div className="text-xs font-bold">🏆 Premiere Rewards</div>
                            <div className="text-[11px] text-slate-400">
                                Revenue: <strong className="text-green-400">+¥{Math.floor(openingWeekend * 0.35).toLocaleString()}</strong>
                                {' '}| Fans: <strong className="text-pink-400">+{premiereFans.toLocaleString()}</strong>
                            </div>
                        </div>
                        <button onClick={() => setShowModal(null)} className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg">
                            🍿 Enter Theatrical Run
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ---- MODAL 3: BOX OFFICE HISTORY ----
    if (showModal === 'blockbusterHistory') {
        return (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-amber-500/40 text-slate-100 rounded-2xl max-w-4xl w-full p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                        <div>
                            <h3 className="text-lg font-black text-amber-300">🏆 Box Office History &amp; Trophy Gallery</h3>
                            <p className="text-xs text-slate-400">All Stage Musicals &amp; Blockbusters produced by your agency.</p>
                        </div>
                        <button onClick={() => setShowModal(null)} className="text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800">✕</button>
                    </div>

                    {/* Active Production */}
                    {activeBlockbuster && activeBlockbuster.status !== 'completed' && (
                        <div className="p-4 bg-slate-800/90 border border-amber-500/50 rounded-xl space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeBlockbuster.status === 'rehearsal' ? 'bg-blue-900/80 text-blue-300' : 'bg-green-900/80 text-green-300'}`}>
                                        {activeBlockbuster.status === 'rehearsal' ? '🎭 In Rehearsal' : '🍿 Box Office Run'}
                                    </span>
                                    <h4 className="font-bold text-base mt-1">{activeBlockbuster.title}</h4>
                                    <p className="text-[11px] text-slate-400">Dir: {activeBlockbuster.directorName} — Scale: {activeBlockbuster.scaleName}</p>
                                </div>
                                <div className="text-right">
                                    {activeBlockbuster.status === 'box_office' && <>
                                        <div className="text-xs text-slate-400">Current Total</div>
                                        <div className="text-xl font-black text-amber-400">¥{(activeBlockbuster.totalGrossRevenue || 0).toLocaleString()}</div>
                                    </>}
                                    {activeBlockbuster.status === 'rehearsal' && <>
                                        <div className="text-xs text-slate-400">Weeks to Premiere</div>
                                        <div className="text-xl font-black text-blue-400">{activeBlockbuster.weeksLeftInPhase}</div>
                                    </>}
                                </div>
                            </div>
                            {activeBlockbuster.status === 'box_office' && (activeBlockbuster.weeklyGrossHistory || []).length > 0 && (
                                <div className="pt-2 space-y-1">
                                    <div className="text-[9px] font-bold text-slate-400 uppercase">Weekly Box Office</div>
                                    {activeBlockbuster.weeklyGrossHistory.map(entry => (
                                        <div key={entry.weekIndex} className="flex items-center space-x-2">
                                            <span className="w-10 text-slate-400 text-[9px]">Wk {entry.weekIndex}</span>
                                            <div className="flex-1 bg-slate-900 rounded-full overflow-hidden h-3 relative">
                                                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                                                    style={{ width: Math.min(100, (entry.gross / (activeBlockbuster.openingWeekendGross || 1)) * 100) + '%' }} />
                                                <span className="absolute inset-0 flex items-center px-2 text-[8px] font-bold text-slate-900">¥{(entry.gross / 1e6).toFixed(1)}M</span>
                                            </div>
                                            <span className={`w-6 text-[9px] font-bold ${entry.rank === 1 ? 'text-amber-400' : 'text-slate-400'}`}>#{entry.rank}</span>
                                        </div>
                                    ))}
                                    {(activeBlockbuster.reachedMilestones || []).length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-1">
                                            {activeBlockbuster.reachedMilestones.map(target => {
                                                const ms = boxOfficeMilestones.find(m => m.target === target);
                                                return ms ? <span key={target} className={`text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-950/60 border border-slate-700 ${ms.color}`}>🏆 {ms.trophy}</span> : null;
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Milestone Guide */}
                    <div className="p-3 bg-slate-800/80 border border-slate-700 rounded-xl space-y-2">
                        <span className="text-[9px] font-bold uppercase text-amber-400 tracking-wider">Box Office Milestone Trophies</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {boxOfficeMilestones.map(ms => (
                                <div key={ms.target} className="p-2 bg-slate-900/80 rounded-lg border border-slate-800 text-center">
                                    <span className={`text-[10px] font-bold ${ms.color}`}>{ms.trophy}</span>
                                    <p className="text-[8px] text-slate-400">{ms.label.split('(')[0].trim()}</p>
                                    <p className="text-[8px] text-green-400 font-semibold">+¥{(ms.bonusMoney / 1e6).toFixed(0)}M +{ms.repBonus} Rep</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Productions */}
                    <div className="space-y-2">
                        <span className="text-xs font-bold uppercase text-slate-300 tracking-wider">Past Productions ({blockbusterHistory.length})</span>
                        {blockbusterHistory.length === 0
                            ? <div className="p-6 text-center bg-slate-800/40 border border-slate-800 rounded-xl text-slate-400 text-sm italic">No completed productions yet. Launch your first!</div>
                            : blockbusterHistory.map(bb => (
                                <div key={bb.id} className="p-4 bg-slate-800/90 border border-slate-700 rounded-xl space-y-2">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${bb.type === 'musical' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                                                    {bb.type === 'musical' ? '🎭 Musical' : '🎬 Film'}
                                                </span>
                                                <h4 className="font-bold">{bb.title}</h4>
                                            </div>
                                            <p className="text-[9px] text-slate-400">Year {bb.year} — Dir: {bb.directorName}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-slate-400">Final Gross</div>
                                            <div className="text-lg font-black text-amber-400">¥{(bb.totalGrossRevenue || 0).toLocaleString()}</div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-700/60 text-xs">
                                        <div className="p-1.5 bg-slate-900/60 rounded text-center">
                                            <div className="text-[8px] text-slate-400">Critics</div>
                                            <strong className="text-red-400">{bb.criticScore}%</strong>
                                        </div>
                                        <div className="p-1.5 bg-slate-900/60 rounded text-center">
                                            <div className="text-[8px] text-slate-400">Audience</div>
                                            <strong className="text-pink-400">{bb.audienceGrade}</strong>
                                        </div>
                                        <div className="p-1.5 bg-slate-900/60 rounded text-center">
                                            <div className="text-[8px] text-slate-400">Opening</div>
                                            <strong className="text-green-400">¥{((bb.openingWeekendGross || 0) / 1e6).toFixed(1)}M</strong>
                                        </div>
                                        <div className="p-1.5 bg-slate-900/60 rounded text-center">
                                            <div className="text-[8px] text-slate-400">Trophies</div>
                                            <strong className="text-amber-400">{(bb.reachedMilestones || []).length} 🏆</strong>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }

    return null;
};
