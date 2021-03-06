import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    const { isLoggedIn, logout } = authContext;

    const [navOpen, setNavOpen] = useState(false);

    return (isLoggedIn ? < div className={`navbar ${navOpen ? 'active' : ''} `} >
        <ul className="navbar-nav">
            <li className="logo" onClick={() => setNavOpen(!navOpen)}>
                <div className="nav-link">
                    <span className="link-text logo-text">MyTeam</span>
                    <svg aria-hidden="true" focusable="false" data-prefix="fad" data-icon="angle-double-right"
                        role="img" viewBox="0 0 448 512"
                        className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x">
                        <g className="fa-group">
                            <path fill="currentColor"
                                d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                                className="fa-secondary"></path>
                            <path fill="currentColor"
                                d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                                className="fa-primary"></path>
                        </g>
                    </svg>
                </div>
            </li>
            <li className="nav-item">
                <Link to="/jobs" className="nav-link">
                    <svg viewBox="0 0 333334 274406" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
                        <path fill="currentColor" d="M95856 44756h197343v83367H95856V44756zm36284 21354h12159v22146c0 4652-393 8193-1187 10623-794 2420-2392 4480-4792 6170-2401 1680-5477 2525-9220 2525-3962 0-7029-560-9202-1671-2182-1111-3861-2734-5048-4879-1186-2136-1889-4784-2100-7936l11557-1633c18 1785 173 3114 457 3978 283 873 767 1566 1451 2107 466 351 1123 522 1981 522 1360 0 2355-522 2994-1566 630-1044 950-2810 950-5288V66109zm17863 20419c0-6654 1780-11837 5349-15540 3569-3712 8535-5563 14907-5563 6527 0 11557 1822 15089 5458 3533 3645 5295 8752 5295 15312 0 4765-767 8667-2309 11714-1543 3047-3780 5420-6691 7120-2921 1699-6554 2544-10909 2544-4418 0-8079-731-10981-2193-2894-1471-5249-3787-7047-6958-1798-3161-2702-7129-2702-11894zm12104 28c0 4111 740 7072 2209 8867 1479 1794 3487 2696 6024 2696 2602 0 4628-883 6053-2639 1433-1766 2145-4917 2145-9483 0-3835-748-6635-2237-8401-1497-1775-3515-2658-6070-2658-2446 0-4418 902-5897 2696-1488 1794-2228 4775-2228 8923zm34295-20447h22703c3779 0 6682 978 8708 2924 2027 1946 3040 4357 3040 7233 0 2411-721 4481-2172 6199-959 1158-2374 2060-4227 2734 2821 703 4884 1908 6217 3626 1324 1718 1990 3873 1990 6465 0 2117-475 4016-1415 5706-950 1689-2246 3019-3880 4006-1023 607-2556 1054-4610 1329-2730 370-4537 560-5432 560h-20922V66111zm12214 16005h5285c1890 0 3213-342 3953-1016 740-683 1114-1661 1114-2943 0-1187-374-2117-1114-2781-739-674-2035-1006-3870-1006h-5368v7746zm0 16005h6180c2091 0 3560-389 4418-1158s1287-1794 1287-3094c0-1206-420-2174-1269-2905s-2337-1101-4464-1101h-6153v8259zm27439-4718l11502-750c246 1937 758 3418 1525 4424 1250 1643 3031 2468 5350 2468 1725 0 3058-417 3989-1262 941-845 1406-1823 1406-2933 0-1054-439-2003-1324-2838s-2948-1614-6189-2364c-5313-1234-9092-2886-11356-4946-2282-2050-3423-4670-3423-7860 0-2089 584-4063 1753-5924 1168-1870 2921-3332 5267-4395s5559-1594 9640-1594c5011 0 8827 968 11456 2914 2629 1937 4190 5022 4692 9256l-11393 702c-302-1851-941-3199-1908-4034-977-845-2319-1263-4026-1263-1406 0-2474 313-3186 930s-1068 1376-1068 2269c0 646 293 1225 867 1747 557 541 1908 1035 4044 1500 5295 1187 9083 2392 11366 3607 2291 1215 3961 2715 5002 4519 1041 1794 1561 3807 1561 6038 0 2610-694 5022-2081 7233-1396 2202-3331 3883-5833 5022-2493 1139-5633 1709-9430 1709-6663 0-11283-1339-13848-4006-2565-2668-4017-6056-4355-10167zM63540 248754c-1809 6080-4428 10989-7583 14822h239984l110 1c8658-489 15114-2795 19413-6882 4230-4022 6585-10021 7109-17957V10758H66082v217184c0 9239 103 11919-2543 20811zm-27857 25581c-1232 87-2467 94-3700 22-4930-287-9800-1812-14191-4402C8173 264281 736 253431 42 239261c-29-225-44-455-44-688V47608c0-2971 2409-5380 5380-5380h49946V5380c0-2971 2408-5380 5379-5380h267250c2971 0 5380 2409 5380 5380v233492c0 285-23 563-65 836-746 10586-4194 18856-10407 24763-6193 5887-14914 9178-26220 9819-229 30-463 45-700 45H35683zm-2992-10688c282-46 572-70 868-70h1958c2130-220 4219-826 6179-1851 11963-6259 13629-21570 13629-33698V52987H10758v185585c0 65-2 129-4 193 504 10212 5739 17954 12502 21944 2933 1730 6131 2746 9315 2931l120 7zm64432-98593c-2971 0-5379-2408-5379-5379s2408-5379 5379-5379h82072c2970 0 5379 2408 5379 5379s-2409 5379-5379 5379H97123zm105587 17c-2980 0-5396-2416-5396-5396s2416-5396 5396-5396h88528c2980 0 5396 2416 5396 5396s-2417 5396-5396 5396h-88528zm0 31224c-2980 0-5396-2416-5396-5396s2416-5396 5396-5396h88528c2980 0 5396 2417 5396 5396 0 2980-2417 5396-5396 5396h-88528zm0 31223c-2980 0-5396-2416-5396-5396s2416-5396 5396-5396h88528c2980 0 5396 2416 5396 5396s-2417 5396-5396 5396h-88528zm-105587-17c-2971 0-5379-2408-5379-5379s2408-5379 5379-5379h82072c2970 0 5379 2408 5379 5379s-2409 5379-5379 5379H97123zm2585-31223c-2970 0-5379-2408-5379-5379s2409-5379 5379-5379h82072c2971 0 5379 2408 5379 5379s-2408 5379-5379 5379H99708z" /></svg>
                    <span className="link-text ">Jobs</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/candidates" className="nav-link">
                    <svg viewBox="0 0 333334 275215" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
                        <path fill="currentColor"
                            d="M230773 227111l6715-23302-3291-3602c-1487-2163-1808-4059-985-5689 1782-3527 5472-2869 8917-2869 3611 0 8070-684 9200 3835 378 1512-98 3093-1156 4722l-3291 3602 6714 23302-11411 9016-11411-9016zM92068 176273c-5653-6426-6127-13153 0-20272 7088 1789 13572 4848 19542 8998 1290-557 2783-793 4261-696 6206-4406 14137-6176 21061-9487 8269 8052 7381 15460-750 22357-4541-1044-8862-2649-12990-4748-106 1058-392 2220-895 3490l2119 17570h-16878l2119-17570c-1317-2220-1828-4130-1771-5726-4920 2946-10247 4833-15818 6083zM69556 82382c-2481 96-4360 610-5645 1476-733 491-1272 1120-1617 1867-385 831-562 1839-529 3000 98 3406 1883 7859 5334 12989l49 74 11198 17806c4490 7141 9196 14416 15046 19766 5623 5142 12450 8622 21471 8645 9772 24 16920-3593 22720-9022 6035-5649 10794-13391 15485-21117l12612-20774c2351-5363 3208-8956 2669-11059-320-1254-1702-1867-4062-1986-500-24-1015-30-1536-15-561 17-1150 54-1762 110-335 30-662 7-973-63-1122 61-2278-15-3459-189l4320-19115c-32050 5052-56024-18753-89903-4761l2443 22534c-1368 62-2660 16-3861-166v2zm14862 79478c-223 309-489 568-785 774 1066 8550 2562 19502 4324 30851H21318c-4775 0-8654 4469-7934 9932l9245 70123h-8435c-7793-595-11755-4617-12411-11599 385-31323-11517-69231 21475-87622 12085-6742 43239-9032 56831-17934 1984-3731 4178-10283 5570-14504l192-570-3-1-189 571c-103 304 281-854 189-571l3 1 137-410c-4994-5365-9081-11705-12999-17935l-11197-17803c-4094-6106-6222-11690-6351-16265-61-2157 304-4112 1099-5827 835-1801 2117-3307 3848-4470 810-546 1713-1007 2713-1384-725-9657-997-21826-528-32011 241-2417 703-4835 1380-7251 4100-14650 16690-25197 31067-30163 6973-2409 4282-8159 11331-7772 16710 915 42499 11679 52407 23104 13884 16009 10303 35717 9834 55245v-2c3105 946 5093 2915 5909 6102 901 3529-77 8506-3069 15294l-9-4c-55 123-118 245-189 364l-12759 21015c-4917 8100-9912 16219-16577 22458l-324 300c637 919 1328 1933 2050 2992 2214 3250 4735 6949 7078 9839 13858 8622 44371 10941 56298 17592 2852 1590 5339 3393 7504 5381 1839-1628 3601-3200 5009-4504-659-738-1304-1481-1941-2221l-6137-7123-4561 120-8688 228c-7459-8579-6989-27012-6275-37653 3480-21383 11748-36783 25211-45689 9125-6034 14570-6369 25228-6376 9303-7 15010-204 22942 5019 25862 17029 33874 57209 21234 84281h-9030l-578 678-807 944-3923 4717c-1565 1882-3143 3767-4858 5545 2172 2125 5091 4681 7787 7042 1268 1111 2488 2180 3574 3154 40453 16126 49339 25502 54274 77672 910 9620 819 9202-8411 9384-34146 674-77680 10-117083-172l159-1207 9245-70123c720-5462-3159-9932-7934-9932h-65001c1593-11463 2775-22412 3323-30673-3035-3372-6281-8135-9065-12221-618-907-1213-1780-1781-2600-5852 3941-12821 6361-21554 6338-9728-25-17301-3359-23593-8461-1767 5274-4356 12529-6850 15992zm132831 20655c13691 15602 11568 40194 11012 62433l13923 23110 33897-56263 14734 360c-3428-6879-7474-13054-12046-18839-1224-1254-3627-3358-6242-5649-2789-2443-5813-5091-8051-7289-912 785-1870 1533-2890 2230-4407 3011-9838 5017-17265 5003-6932-13-12152-1947-16433-4805-2115-1411-3976-3034-5692-4750-1457 1352-3174 2886-4949 4458zm-103027 48034c6579 0 11912 5333 11912 11912s-5333 11911-11912 11911-11911-5333-11911-11911c0-6579 5333-11912 11911-11912zm98906-67866c-7211-24705-3831-47418 15614-66845 3437 11111 11143 20284 24250 27061 6272 4657 12329 10280 18200 16735 1043-4278-2928-9487-7740-14853 4454 2202 8544 5274 11446 11203 3360 6869 3321 12663 2211 20118-342 2296-829 4490-1469 6574-202 110-377 251-513 419-531 653-1071 1286-1552 1848-186 218-357 417-822 978l-3923 4717c-3005 3614-6054 7234-9922 9878-3723 2544-8311 4239-14584 4227-5791-11-10174-1642-13783-4051-3752-2505-6767-5906-9643-9245l-7168-8320c-159-184-366-333-601-443z" />
                    </svg>
                    <span className="link-text ">Candidates</span>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/settings" className="nav-link">
                    <svg viewBox="0 0 3333 3333" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
                        <path fill="currentColor"
                            d="M2658 507c-9-9-18-15-28-19-9-4-19-6-31-6s-23 2-32 6-18 10-27 19l-1 1-168 168c-25 25-64 28-92 8-20-13-41-25-63-37-23-13-46-24-69-34-23-11-47-21-72-30-22-9-47-17-73-26-31-10-50-39-50-69V230c0-12-2-23-6-33-4-9-10-18-18-26s-17-14-26-18c-10-4-20-6-33-6h-324c-11 0-22 2-31 6s-19 10-28 19c-8 8-14 17-18 26s-6 20-6 32v236c0 36-26 66-60 72-26 6-50 13-72 19-24 7-48 16-72 25-1 0-2 1-4 1-21 8-43 18-67 28-24 11-46 22-66 33-29 16-64 10-86-12L849 448l-2-2c-8-8-16-15-25-18-8-4-18-6-30-6s-22 2-31 6c-10 4-19 11-29 20L506 675c-9 9-16 18-20 28-4 9-6 19-6 31s2 23 6 32 10 18 19 27l1 1 168 168c25 25 28 64 8 92-13 20-25 41-37 63-13 23-24 46-34 69-11 23-21 47-30 72-9 22-17 47-26 73-10 31-39 50-69 50H228c-12 0-23 2-33 6-9 4-18 10-26 18s-14 17-18 26c-4 10-6 20-6 33v324c0 11 2 22 6 31s10 19 19 28c8 8 17 14 26 18s20 6 32 6h236c36 0 66 26 72 60 6 26 13 50 19 72 7 24 16 48 25 72 9 23 19 47 30 72s23 48 33 69c15 29 9 63-13 85l-184 183-1 1c-8 8-15 16-18 25-4 8-6 18-6 30s2 22 6 31c4 10 11 19 20 29l225 228c9 8 18 14 28 18s21 6 33 6 24-2 33-6 18-9 27-17l167-170c25-26 65-29 93-9 20 13 41 25 63 37 23 13 46 24 69 34 23 11 47 21 72 30 22 9 47 17 73 26 31 10 50 39 50 69v258c0 12 2 23 6 33 4 9 10 18 18 26 16 16 35 24 59 24h324c11 0 22-2 31-6s19-10 28-19c8-8 14-17 18-26s6-20 6-32v-236c0-36 26-66 60-72 26-6 50-13 72-19 24-7 48-16 72-25 23-9 47-19 72-30s48-23 69-33c29-15 63-9 85 13l183 184 1 1c8 8 16 15 25 18 8 4 19 6 31 6s23-2 31-6c9-4 17-10 25-18l3-3 227-224c8-9 14-18 18-28s6-21 6-33-2-24-6-33-9-18-17-27l-170-167c-26-25-29-65-9-93 13-20 25-41 37-63 13-23 24-46 34-69 11-23 21-47 30-72 9-22 17-47 26-73 10-31 39-50 69-50h258c12 0 23-2 33-6 9-4 18-10 26-18s14-17 18-26c4-10 6-20 6-33v-324c0-11-2-22-6-31s-10-19-19-28c-8-8-17-14-26-18s-20-6-32-6h-236c-36 0-67-27-72-61-6-23-12-46-19-70-7-23-15-47-25-72 0-1-1-2-1-4-9-24-19-47-28-68-10-23-21-45-33-66-16-29-10-64 12-86l184-186 2-2c8-8 15-16 18-25 4-8 6-18 6-30s-2-22-6-31c-4-10-11-19-20-29l-227-226zm29-154c27 11 52 28 74 50l227 227 1 1c22 22 39 47 50 74 12 28 18 57 18 88s-6 61-18 88-29 51-51 72l-146 148c4 9 9 18 13 27 12 25 22 51 32 76 1 1 1 2 1 4 10 25 19 52 28 81 3 9 6 18 8 28h180c31 0 61 6 88 17s51 28 73 50l2 2c21 22 38 47 49 74s17 56 17 86v324c0 31-6 60-17 88-11 27-28 52-50 74s-47 39-74 50-56 17-88 17h-206c-4 10-7 20-11 30-10 27-22 53-34 80-13 27-25 53-38 78-4 8-9 16-13 24l129 127 3 3c21 22 37 47 48 74s16 56 16 86-5 59-16 86-26 52-47 74c-1 1-1 2-2 2l-229 226c-21 22-46 40-73 51-27 12-57 18-89 18-31 0-61-6-89-18s-52-29-73-51l-145-145c-10 5-19 9-28 13-25 11-51 22-79 33-26 10-54 20-82 28-9 3-19 6-28 8v180c0 31-6 61-17 88s-28 51-50 73l-2 2c-22 21-47 38-73 49-27 11-56 17-86 17h-324c-64 0-118-22-162-67-22-22-39-47-50-74s-17-56-17-88v-206c-10-4-20-7-30-11-27-10-53-22-80-34-27-13-53-25-78-38-8-4-16-9-24-13l-127 129-3 3c-22 21-47 37-74 48s-56 16-86 16-59-5-86-16-52-26-74-47c-1-1-2-1-2-2l-227-230c-22-22-39-47-50-74-12-28-18-57-18-88s6-61 18-88 29-51 51-72l145-145c-5-10-9-19-13-28-11-25-22-51-33-79-10-26-20-54-28-82-3-10-6-19-8-28H230c-31 0-61-6-88-17s-51-28-73-50l-2-2c-21-22-38-47-49-73-11-27-17-56-17-86v-324c0-31 6-60 17-88 11-27 28-52 50-74s47-39 74-50 56-17 88-17h206c4-10 7-20 11-30 10-27 22-53 34-80 13-27 25-53 38-78 4-8 9-16 13-24L405 901c-22-22-39-47-51-74-12-28-18-57-18-88s6-60 18-88 28-52 51-74l227-227 1-1c22-22 47-39 74-50 28-12 57-18 88-18s61 6 88 18 51 29 72 51l148 145c9-4 18-9 27-13 23-10 48-21 75-32 1-1 2-1 4-1 26-10 54-20 82-28 9-3 19-6 28-8V233c0-31 6-61 17-88s28-51 50-73l2-2c22-21 47-38 73-49 27-11 56-17 86-17h324c31 0 60 6 88 17 27 11 52 28 75 50 22 22 39 47 50 74s17 56 17 88v206c10 4 20 7 30 11 27 10 53 21 80 34s53 25 78 38c8 4 16 9 24 13l127-127c22-22 47-39 74-51 28-12 57-18 88-18s60 6 88 18zM1667 958c48 0 95 5 141 14 45 9 90 23 134 42 42 18 83 40 120 66 38 25 72 54 104 85 32 32 60 67 85 104 25 38 47 78 66 120 1 2 2 4 2 6 18 43 31 86 39 129 9 46 14 93 14 141s-5 95-14 141c-9 45-23 90-42 134-18 42-40 82-66 120-25 38-54 72-85 104-32 32-67 60-104 85-38 25-78 47-120 66-2 1-4 2-6 2-43 18-86 31-129 39-46 9-93 14-141 14s-95-5-141-14c-45-9-90-23-134-42-42-18-82-40-120-66-38-25-72-54-104-85-32-32-60-67-85-104-25-38-47-78-66-120-1-2-2-4-2-6-18-43-31-86-39-129-9-46-14-93-14-141s5-95 14-141c9-45 23-90 42-134 18-42 40-82 66-120 25-38 54-72 85-104 32-32 67-60 104-85 38-25 78-47 120-66 2-1 4-2 6-2 43-18 85-31 129-39 46-9 93-14 141-14zm113 157c-36-7-74-11-113-11s-76 4-113 11c-35 7-69 17-101 30-1 1-3 1-4 2-35 15-68 33-97 52-30 20-57 42-83 67-25 25-48 53-68 83-20 29-37 62-52 97-14 34-25 69-32 106-7 36-11 74-11 113s4 76 11 113c7 35 17 69 30 102 1 1 1 3 2 4 15 35 33 68 52 97 20 30 42 57 68 83 25 25 53 48 83 67 29 20 62 37 97 52 34 14 69 25 106 32 36 7 74 11 113 11s76-4 113-11c35-7 69-17 101-30 1-1 3-1 4-2 35-15 68-33 97-52 30-20 57-42 83-67 25-25 48-53 68-83 20-29 37-62 52-97 14-34 25-69 32-106 7-36 11-74 11-113s-4-76-11-113c-7-35-17-69-30-101-1-1-1-3-2-4-15-35-33-68-52-97-20-30-42-57-68-83-25-25-53-48-83-67-29-20-62-37-97-52-34-14-69-25-106-32z" fillRule="nonzero" />
                    </svg>
                    <span className="link-text ">Settings</span>
                </Link>
            </li>
            <li className="nav-item" onClick={logout}>
                <Link to='#' className="nav-link" >
                    <svg viewBox="0 0 512 512" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd">
                        <path fill="currentColor" d="m211.863281 512c-116.820312 0-211.863281-95.035156-211.863281-211.863281 0-95.152344 64.007812-179.171875 155.664062-204.328125 9.386719-2.53125 19.109376 2.949218 21.699219 12.363281 2.574219 9.398437-2.949219 19.121094-12.355469 21.691406-76.359374 20.964844-129.699218 90.980469-129.699218 170.273438 0 97.34375 79.199218 176.554687 176.554687 176.554687 97.351563 0 176.550781-79.210937 176.550781-176.554687 0-77.429688-51.757812-146.996094-125.863281-169.171875-9.34375-2.792969-14.644531-12.636719-11.851562-21.980469 2.800781-9.328125 12.664062-14.621094 21.972656-11.84375 88.9375 26.617187 151.050781 110.082031 151.050781 202.996094 0 116.828125-95.039062 211.863281-211.859375 211.863281zm0 0" />
                        <path fill="currentColor" d="m211.863281 229.515625c-9.75 0-17.65625-7.894531-17.65625-17.652344v-194.207031c0-9.761719 7.90625-17.65625 17.65625-17.65625s17.652344 7.894531 17.652344 17.65625v194.207031c0 9.757813-7.902344 17.652344-17.652344 17.652344zm0 0" />
                    </svg>
                    <span className='link-text'>Logout</span>
                </Link>
            </li>
        </ul></div > : null)
}

export default Navbar; 