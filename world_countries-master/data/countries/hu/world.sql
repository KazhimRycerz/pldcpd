SET NAMES utf8;

DROP TABLE IF EXISTS `world`;

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `alpha_2` char(2) NOT NULL DEFAULT "",
  `alpha_3` char(3) NOT NULL DEFAULT "",
  `name` varchar(75) NOT NULL DEFAULT "",
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO `world` (`id`, `alpha_2`, `alpha_3`, `name`) VALUES
(4,"af","afg","Afganisztán"),
(248,"ax","ala","Åland"),
(8,"al","alb","Albánia"),
(12,"dz","dza","Algéria"),
(581,"um","umi","Amerikai Csendes-óceáni szigetek"),
(840,"us","usa","Amerikai Egyesült Államok"),
(16,"as","asm","Amerikai Szamoa"),
(850,"vi","vir","Amerikai Virgin-szigetek"),
(20,"ad","and","Andorra"),
(24,"ao","ago","Angola"),
(660,"ai","aia","Anguilla"),
(10,"aq","ata","Antarktisz"),
(28,"ag","atg","Antigua és Barbuda"),
(32,"ar","arg","Argentína"),
(533,"aw","abw","Aruba"),
(36,"au","aus","Ausztrália"),
(40,"at","aut","Ausztria"),
(31,"az","aze","Azerbajdzsán"),
(44,"bs","bhs","Bahama-szigetek"),
(48,"bh","bhr","Bahrein"),
(50,"bd","bgd","Banglades"),
(52,"bb","brb","Barbados"),
(56,"be","bel","Belgium"),
(84,"bz","blz","Belize"),
(204,"bj","ben","Benin"),
(60,"bm","bmu","Bermuda"),
(64,"bt","btn","Bhután"),
(624,"gw","gnb","Bissau-Guinea"),
(68,"bo","bol","Bolívia"),
(70,"ba","bih","Bosznia-Hercegovina"),
(72,"bw","bwa","Botswana"),
(74,"bv","bvt","Bouvet-sziget"),
(76,"br","bra","Brazília"),
(86,"io","iot","Brit Indiai-óceáni Terület"),
(92,"vg","vgb","Brit Virgin-szigetek"),
(96,"bn","brn","Brunei"),
(100,"bg","bgr","Bulgária"),
(854,"bf","bfa","Burkina Faso"),
(108,"bi","bdi","Burundi"),
(152,"cl","chl","Chile"),
(196,"cy","cyp","Ciprus"),
(174,"km","com","Comore-szigetek"),
(184,"ck","cok","Cook-szigetek"),
(188,"cr","cri","Costa Rica"),
(531,"cw","cuw","Curaçao"),
(148,"td","tcd","Csád"),
(203,"cz","cze","Csehország"),
(208,"dk","dnk","Dánia"),
(710,"za","zaf","Dél-afrikai Köztársaság"),
(239,"gs","sgs","Déli-Georgia és Déli-Sandwich-szigetek"),
(728,"ss","ssd","Dél-Szudán"),
(410,"kr","kor","Dél-Korea (Koreai Köztársaság)"),
(212,"dm","dma","Dominikai Közösség"),
(214,"do","dom","Dominikai Köztársaság"),
(262,"dj","dji","Dzsibuti"),
(218,"ec","ecu","Ecuador"),
(226,"gq","gnq","Egyenlítői-Guinea"),
(784,"ae","are","Egyesült Arab Emírségek"),
(826,"gb","gbr","Egyesült Királyság"),
(818,"eg","egy","Egyiptom"),
(384,"ci","civ","Elefántcsontpart"),
(222,"sv","slv","Salvador"),
(232,"er","eri","Eritrea"),
(580,"mp","mnp","Északi-Mariana-szigetek"),
(408,"kp","prk","Észak-Korea (Koreai NDK)"),
(233,"ee","est","Észtország"),
(231,"et","eth","Etiópia"),
(238,"fk","flk","Falkland-szigetek"),
(112,"by","blr","Fehéroroszország"),
(234,"fo","fro","Feröer"),
(242,"fj","fji","Fidzsi"),
(246,"fi","fin","Finnország"),
(260,"tf","atf","Francia déli és antarktiszi területek"),
(254,"gf","guf","Francia Guyana Francia Guyana"),
(250,"fr","fra","Franciaország"),
(258,"pf","pyf","Francia Polinézia"),
(608,"ph","phl","Fülöp-szigetek"),
(266,"ga","gab","Gabon"),
(270,"gm","gmb","Gambia"),
(288,"gh","gha","Ghána"),
(292,"gi","gib","Gibraltár"),
(300,"gr","grc","Görögország"),
(308,"gd","grd","Grenada"),
(304,"gl","grl","Grönland"),
(268,"ge","geo","Grúzia"),
(312,"gp","glp","Guadeloupe"),
(316,"gu","gum","Guam"),
(320,"gt","gtm","Guatemala"),
(831,"gg","ggy","Guernsey Bailiffség"),
(324,"gn","gin","Guinea"),
(328,"gy","guy","Guyana"),
(332,"ht","hti","Haiti"),
(334,"hm","hmd","Heard-sziget és McDonald-szigetek"),
(528,"nl","nld","Hollandia"),
(340,"hn","hnd","Honduras"),
(344,"hk","hkg","Hongkong"),
(191,"hr","hrv","Horvátország"),
(356,"in","ind","India"),
(360,"id","idn","Indonézia"),
(368,"iq","irq","Irak"),
(364,"ir","irn","Irán"),
(372,"ie","irl","Írország"),
(352,"is","isl","Izland"),
(376,"il","isr","Izrael"),
(388,"jm","jam","Jamaica"),
(392,"jp","jpn","Japán"),
(887,"ye","yem","Jemen"),
(832,"je","jey","Jersey Bailiffség"),
(400,"jo","jor","Jordánia"),
(136,"ky","cym","Kajmán-szigetek"),
(116,"kh","khm","Kambodzsa"),
(120,"cm","cmr","Kamerun"),
(124,"ca","can","Kanada"),
(162,"cx","cxr","Karácsony-sziget"),
(535,"bq","bes","Karibi Hollandia (Bonaire, Saba, Sint Eustatius)"),
(634,"qa","qat","Katar"),
(398,"kz","kaz","Kazahsztán"),
(626,"tl","tls","Kelet-Timor"),
(404,"ke","ken","Kenya"),
(156,"cn","chn","Kína"),
(417,"kg","kgz","Kirgizisztán"),
(296,"ki","kir","Kiribati"),
(166,"cc","cck","Kókusz (Keeling)-szigetek"),
(170,"co","col","Kolumbia"),
(180,"cd","cod","Kongói Demokratikus Köztársaság (Zaire)"),
(178,"cg","cog","Kongói Köztársaság (Kongó)"),
(140,"cf","caf","Közép-Afrika"),
(192,"cu","cub","Kuba"),
(414,"kw","kwt","Kuvait"),
(418,"la","lao","Laosz"),
(616,"pl","pol","Lengyelország"),
(426,"ls","lso","Lesotho"),
(428,"lv","lva","Lettország"),
(422,"lb","lbn","Libanon"),
(430,"lr","lbr","Libéria"),
(434,"ly","lby","Líbia"),
(438,"li","lie","Liechtenstein"),
(440,"lt","ltu","Litvánia"),
(442,"lu","lux","Luxemburg"),
(807,"mk","mkd","Észak-Macedónia"),
(450,"mg","mdg","Madagaszkár"),
(348,"hu","hun","Magyarország"),
(446,"mo","mac","Makaó"),
(458,"my","mys","Malajzia"),
(454,"mw","mwi","Malawi"),
(462,"mv","mdv","Maldív-szigetek"),
(466,"ml","mli","Mali"),
(470,"mt","mlt","Málta"),
(833,"im","imn","Man-sziget"),
(504,"ma","mar","Marokkó"),
(584,"mh","mhl","Marshall-szigetek"),
(474,"mq","mtq","Martinique"),
(478,"mr","mrt","Mauritánia"),
(480,"mu","mus","Mauritius"),
(175,"yt","myt","Mayotte"),
(484,"mx","mex","Mexikó"),
(104,"mm","mmr","Mianmar"),
(583,"fm","fsm","Mikronézia"),
(498,"md","mda","Moldova"),
(492,"mc","mco","Monaco"),
(496,"mn","mng","Mongólia"),
(499,"me","mne","Montenegró"),
(500,"ms","msr","Montserrat"),
(508,"mz","moz","Mozambik"),
(516,"na","nam","Namíbia"),
(520,"nr","nru","Nauru"),
(276,"de","deu","Németország"),
(524,"np","npl","Nepál"),
(558,"ni","nic","Nicaragua"),
(562,"ne","ner","Niger"),
(566,"ng","nga","Nigéria"),
(570,"nu","niu","Niue"),
(574,"nf","nfk","Norfolk-sziget"),
(578,"no","nor","Norvégia"),
(732,"eh","esh","Nyugat-Szahara"),
(380,"it","ita","Olaszország"),
(512,"om","omn","Omán"),
(643,"ru","rus","Oroszország"),
(51,"am","arm","Örményország"),
(586,"pk","pak","Pakisztán"),
(585,"pw","plw","Palau"),
(275,"ps","pse","Palesztina"),
(591,"pa","pan","Panama"),
(598,"pg","png","Pápua Új-Guinea"),
(600,"py","pry","Paraguay"),
(604,"pe","per","Peru"),
(612,"pn","pcn","Pitcairn-szigetek"),
(620,"pt","prt","Portugália"),
(630,"pr","pri","Puerto Rico"),
(638,"re","reu","Réunion"),
(642,"ro","rou","Románia"),
(646,"rw","rwa","Ruanda"),
(652,"bl","blm","Saint-Barthélemy"),
(659,"kn","kna","Saint Kitts és Nevis"),
(662,"lc","lca","Saint Lucia"),
(663,"mf","maf","Saint-Martin"),
(666,"pm","spm","Saint-Pierre és Miquelon"),
(670,"vc","vct","Saint Vincent és a Grenadine-szigetek"),
(90,"sb","slb","Salamon-szigetek"),
(674,"sm","smr","San Marino"),
(678,"st","stp","São Tomé és Príncipe"),
(690,"sc","syc","Seychelle-szigetek"),
(694,"sl","sle","Sierra Leone"),
(534,"sx","sxm","Sint Maarten"),
(724,"es","esp","Spanyolország"),
(744,"sj","sjm","Spitzbergák és Jan Mayen-sziget"),
(144,"lk","lka","Srí Lanka"),
(740,"sr","sur","Suriname"),
(756,"ch","che","Svájc"),
(752,"se","swe","Svédország"),
(882,"ws","wsm","Szamoa"),
(682,"sa","sau","Szaúd-Arábia"),
(686,"sn","sen","Szenegál"),
(654,"sh","shn","Szent Ilona"),
(688,"rs","srb","Szerbia"),
(702,"sg","sgp","Szingapúr"),
(760,"sy","syr","Szíria"),
(703,"sk","svk","Szlovákia"),
(705,"si","svn","Szlovénia"),
(706,"so","som","Szomália"),
(729,"sd","sdn","Szudán"),
(748,"sz","swz","Szváziföld"),
(762,"tj","tjk","Tádzsikisztán"),
(158,"tw","twn","Tajvan"),
(834,"tz","tza","Tanzánia"),
(764,"th","tha","Thaiföld"),
(768,"tg","tgo","Togo"),
(772,"tk","tkl","Tokelau-szigetek"),
(776,"to","ton","Tonga"),
(792,"tr","tur","Törökország"),
(780,"tt","tto","Trinidad és Tobago"),
(788,"tn","tun","Tunézia"),
(796,"tc","tca","Turks- és Caicos-szigetek"),
(798,"tv","tuv","Tuvalu"),
(795,"tm","tkm","Türkmenisztán"),
(800,"ug","uga","Uganda"),
(540,"nc","ncl","Új-Kaledónia"),
(554,"nz","nzl","Új-Zéland"),
(804,"ua","ukr","Ukrajna"),
(858,"uy","ury","Uruguay"),
(860,"uz","uzb","Üzbegisztán"),
(548,"vu","vut","Vanuatu"),
(336,"va","vat","Vatikán"),
(862,"ve","ven","Venezuela"),
(704,"vn","vnm","Vietnám"),
(876,"wf","wlf","Wallis és Futuna"),
(894,"zm","zmb","Zambia"),
(716,"zw","zwe","Zimbabwe"),
(132,"cv","cpv","Zöld-foki Köztársaság")