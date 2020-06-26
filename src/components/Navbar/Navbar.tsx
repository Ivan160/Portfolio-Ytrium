import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';
import { Link, NavLink } from 'react-router-dom';
import { NavContext } from "../../contexts/NavContext";
import anime from 'animejs';
import Network from "./Network/Network";
import style from './Navbar.module.scss';
import { useTranslation } from "react-i18next";

type Props = { refLink: any };

const Navbar: FC<Props> = ({ refLink }) => {
   const { isMinScreen, isOpenMenu } = useContext(NavContext);
   const { t } = useTranslation();
   const [ language, setLanguage ] = useState<string>('en');

   const changeLanguage = useCallback((lang: string) => {
      i18next.changeLanguage(lang);
      setLanguage(lang);
   }, []);


   useEffect(() => {
      anime({
         targets: '.link-anime',
         easing: 'linear',
         width: isOpenMenu ? {
            value: 65,
            duration: 500,
         } : 0,
         opacity: isOpenMenu ? {
            value: 1,
            duration: 350
         } : {
            value: 0,
            duration: 350
         },
         translateX: isOpenMenu ? {
            value: 0,
            duration: 500,
         } : -20,
         delay: (el, i) => i * 60
      })

      anime({
         targets: '.network',
         easing: 'linear',
         opacity: isOpenMenu || isMinScreen ? {
            value: 1,
            duration: 500,
         } : 0,
         delay: (el, i) => i * 170
      })
   }, [ isOpenMenu, isMinScreen ]);

   const animationAbout: () => void = () => {
      anime({
         targets: '#about_path_one',
         translateY: [
            { value: '-3px' },
            { value: 0 }
         ],
         duration: 650,
         easing: 'easeInOutQuad',
      });
   };

   const animationSkills: () => void = () => {
      anime({
         targets: '#skills_svg',
         rotate: [
            { value: 0, duration: 0 },
            { value: 180, duration: 1000 },
         ],
         easing: 'easeInOutCubic',
      });
   };

   const animationContact: () => void = () => {
      anime({
         targets: '#contact_path_one',
         translateY: [
            { value: '-4px' },
            { value: 0 }
         ],
         easing: 'easeInOutQuad',
      });
   };

   return (
      <nav id='navbar' ref={refLink} className={`${style.navbar} ${isMinScreen ? style.minScreen :
         isOpenMenu ? style.open_menu : style.close_menu}`}>

         <div className={style.menu}>
            <ul className={style.link_list}>
               <li className={style.home}>
                  <NavLink exact to='/' activeClassName={style.active_link}>
                     <svg viewBox='0 0 32 29' xmlns='http://www.w3.org/2000/svg'>
                        <path id='home_path_one'
                              d='M1.14267 13.7103H1.13458L5.29691 10.0318L8.10494 7.55002L8.56732 7.14156L16 0.5728L23.4328 7.14156L23.8952 7.55002L26.7032 10.0318L30.8655 13.7103H30.8646'/>
                        <path
                           d='M26.7032 12.7553V27.5171C26.7032 27.7959 26.5929 28.0632 26.3966 28.2603C26.2004 28.4574 25.9342 28.5681 25.6566 28.5681H6.3434C6.06585 28.5681 5.79966 28.4574 5.6034 28.2603C5.40713 28.0632 5.29688 27.7959 5.29688 27.5171V12.7553'/>
                     </svg>
                     <p className={`${style.link_text} link-anime`}>{t('nav.home')}</p>
                  </NavLink>
               </li>
               <li className={style.about}>
                  <NavLink to='/about' activeClassName={style.active_link} onMouseEnter={animationAbout}>
                     <svg viewBox='0 -3 32 40' xmlns='http://www.w3.org/2000/svg'>
                        <path id='about_path_one'
                              d='M15.775 17.8459C18.1343 17.8459 20.1775 16.9977 21.8474 15.3236C23.5173 13.6495 24.3627 11.6026 24.3627 9.23674C24.3627 6.87084 23.5166 4.82397 21.8467 3.1499C20.1768 1.47582 18.1343 0.628311 15.775 0.628311C13.4156 0.628311 11.3724 1.47652 9.70323 3.15059C8.03401 4.82467 7.18512 6.87154 7.18512 9.23674C7.18512 11.602 8.03192 13.6509 9.70114 15.3243C11.3704 16.9977 13.4163 17.8459 15.775 17.8459Z'/>
                        <path
                           d='M30.8015 28.0652C30.746 27.3078 30.65 26.5539 30.5139 25.8068C30.3782 25.0384 30.1921 24.2797 29.9568 23.5359C29.7201 22.7998 29.4081 22.0902 29.0257 21.4185C28.6491 20.7419 28.1761 20.1238 27.6218 19.5838C27.037 19.0334 26.3511 18.6019 25.6023 18.3133C24.7806 17.9958 23.9063 17.8373 23.0257 17.8462C22.6615 17.8462 22.3099 17.9956 21.6295 18.4396C21.2117 18.7133 20.7242 19.0295 20.1762 19.3793C19.7089 19.6774 19.0759 19.9573 18.2959 20.21C16.8019 20.7071 15.1876 20.7071 13.6936 20.21C12.9129 19.9573 12.2806 19.6781 11.8133 19.38C11.2723 19.0309 10.7827 18.7168 10.3579 18.4396C9.67894 17.9956 9.32657 17.8462 8.96515 17.8462C8.08449 17.8372 7.21013 17.9959 6.38855 18.314C5.63956 18.6019 4.95363 19.0332 4.36905 19.5838C3.8175 20.1246 3.34697 20.7425 2.97211 21.4185C2.58966 22.0904 2.27764 22.8002 2.04105 23.5366C1.806 24.2803 1.6199 25.0387 1.48395 25.8068C1.34767 26.5541 1.25166 27.3083 1.19635 28.0659C1.14899 28.7501 1.12671 29.4621 1.12671 30.177C1.12671 32.0431 1.71863 33.5531 2.88507 34.6673C4.03757 35.7654 5.56195 36.3239 7.4164 36.3239H24.5842C26.438 36.3239 27.9624 35.7654 29.1149 34.6673C30.282 33.5538 30.8732 32.0431 30.8732 30.177C30.8732 29.4566 30.8489 28.7459 30.8015 28.0652Z'/>
                     </svg>
                     <p className={`${style.link_text} link-anime`}>{t('nav.about')}</p>
                  </NavLink>
               </li>
               <li className={style.works}>
                  <NavLink to='/works' activeClassName={style.active_link}>
                     <svg viewBox='0 0 30 37' xmlns='http://www.w3.org/2000/svg'>
                        <path
                           d='M14.6258 1.12036C14.6921 1.12036 14.7679 1.12036 14.8342 1.1297H14.8437H14.8532C15.9995 1.17638 17.0796 1.63386 17.9038 2.41812C18.1122 2.61418 18.3017 2.82892 18.4628 3.05299C19.0218 3.81857 19.3344 4.73354 19.3533 5.67651C19.3723 6.51678 19.1544 7.34772 18.7186 8.08529L17.7049 9.80318L19.7228 9.76583L26.3926 9.63512C26.402 9.63512 26.4115 9.63512 26.421 9.63512C26.5347 9.63512 26.6484 9.64446 26.7526 9.67247C26.9989 9.72849 27.2263 9.84986 27.4063 10.0273L27.4347 10.0553C27.6621 10.2793 27.8137 10.5781 27.8421 10.8955C27.8421 10.9516 27.8421 10.9982 27.8421 11.0543L27.9747 17.6737C27.2452 17.3376 26.4494 17.1602 25.6252 17.1602C25.5967 17.1602 25.5778 17.1602 25.5494 17.1602C24.0714 17.1789 22.6787 17.7671 21.6461 18.8221C20.6134 19.8678 20.0544 21.2496 20.0734 22.7154C20.0923 24.1812 20.6892 25.5443 21.7598 26.5619C22.8019 27.5609 24.1851 28.1118 25.6346 28.1118C25.6536 28.1118 25.682 28.1118 25.7104 28.1118C26.582 28.1024 27.4252 27.8877 28.1737 27.5049L28.3253 34.9647C28.3253 35.0114 28.3253 35.058 28.3347 35.1047C28.3253 35.2168 28.3063 35.3195 28.2684 35.4222C28.0884 35.5062 27.8895 35.5529 27.681 35.5529L18.2923 35.6836L18.2828 35.1514C18.4628 35.0114 18.6333 34.8713 18.7944 34.7033C19.6565 33.835 20.1207 32.6773 20.1018 31.4635C20.1018 31.2861 20.0828 31.0994 20.0639 30.9314C19.9313 29.923 19.4481 28.9801 18.6996 28.2612C17.828 27.4302 16.6911 26.9727 15.4785 26.9727C15.4595 26.9727 15.4311 26.9727 15.4121 26.9727C14.1805 26.9914 13.0247 27.4769 12.1626 28.3545C11.812 28.7093 11.5278 29.1201 11.3099 29.5589C10.9972 30.1938 10.8457 30.8753 10.8551 31.5942C10.8741 32.808 11.3762 33.9377 12.2573 34.7873C12.4184 34.9367 12.5889 35.086 12.7784 35.2168L12.7878 35.7489L12.3994 35.7583L3.42749 35.8796H3.40854C3.02958 35.8796 2.66957 35.7396 2.39482 35.4688C2.24324 35.3195 2.12007 35.1421 2.04428 34.946C1.98744 34.7966 1.95902 34.6379 1.95902 34.4792L1.86427 27.9157L1.72216 18.0378L1.62742 11.7545V11.4837C1.6369 11.1289 1.77901 10.7928 2.03481 10.5314C2.30008 10.2607 2.66009 10.1019 3.04853 10.0926L9.70878 9.9619L11.7078 9.92455L10.6467 8.25334L10.6372 8.24401L10.6278 8.23467C10.173 7.51577 9.92668 6.70351 9.90773 5.87257C9.87931 4.63084 10.3435 3.45445 11.2246 2.55816C12.0962 1.66187 13.271 1.15771 14.5311 1.1297C14.569 1.12036 14.5974 1.12036 14.6258 1.12036ZM14.6258 0C14.5879 0 14.55 0 14.5121 0C12.9015 0.0280091 11.4425 0.709563 10.4099 1.77391C9.37719 2.83825 8.7519 4.29473 8.78032 5.88191C8.79927 6.95559 9.13086 7.96392 9.67088 8.81353C9.67088 8.82286 9.68036 8.8322 9.68036 8.8322L3.02011 8.96291C2.30955 8.98158 1.66532 9.28034 1.21057 9.74716C0.774761 10.2046 0.500014 10.8115 0.49054 11.4837V11.7732L0.58528 18.0565L0.72739 27.9157L0.822131 34.4885C0.822131 34.7873 0.878975 35.0767 0.983189 35.3381C1.11583 35.6929 1.33373 36.0197 1.60848 36.2718C2.0727 36.7199 2.71694 37 3.40854 37C3.41802 37 3.42749 37 3.44644 37L12.4468 36.8786L13.2521 36.8693C13.65 36.86 13.9626 36.5425 13.9626 36.1504L13.9437 34.9927C13.9437 34.7593 13.8205 34.5352 13.6216 34.4045C13.4321 34.2831 13.2521 34.1431 13.0815 33.9844C12.4373 33.3682 12.0394 32.5185 12.0299 31.5756C12.0204 31.0247 12.1436 30.5112 12.371 30.0444C12.532 29.7083 12.7499 29.4002 13.0152 29.1388C13.6405 28.5039 14.5026 28.1118 15.469 28.0931C15.4879 28.0931 15.4974 28.0931 15.5164 28.0931C16.4638 28.0931 17.3164 28.4572 17.9417 29.0641C18.4912 29.5869 18.8607 30.2872 18.9649 31.0714C18.9839 31.2021 18.9933 31.3422 18.9933 31.4729C19.0028 32.4252 18.6333 33.2841 18.008 33.919C17.847 34.0777 17.6764 34.2271 17.487 34.3485C17.288 34.4792 17.1743 34.7033 17.1743 34.946L17.1933 36.1037C17.1933 36.4958 17.5154 36.8039 17.9133 36.8039H17.9228H18.1122L27.7284 36.6732C28.2779 36.6639 28.78 36.4865 29.1969 36.1971C29.3769 35.861 29.4906 35.4782 29.5095 35.0767C29.5 35.0394 29.5 34.9927 29.5 34.9553L29.32 26.0018V25.4509C29.159 25.4696 28.9979 25.5069 28.9221 25.591C28.8937 25.619 28.8653 25.647 28.8369 25.6843C28.041 26.4873 26.9515 26.9821 25.7388 27.0008C25.7199 27.0008 25.701 27.0008 25.682 27.0008C24.4788 27.0008 23.3988 26.5339 22.5935 25.7684C21.7787 24.9934 21.2766 23.9104 21.2576 22.706C21.2387 21.5016 21.7219 20.4093 22.5082 19.6064C23.2945 18.8034 24.3935 18.3086 25.6157 18.2899C25.6346 18.2899 25.6536 18.2899 25.6725 18.2899C26.8663 18.2899 27.9463 18.7568 28.7516 19.5223C28.78 19.5503 28.8084 19.5784 28.8369 19.6064L28.8463 19.6157C28.8748 19.6437 28.8937 19.6624 28.9221 19.681L28.9316 19.6904C28.9411 19.6997 28.9411 19.6997 28.9505 19.6997C28.96 19.7091 28.9695 19.7184 28.979 19.7184C29.0263 19.7464 29.0737 19.7744 29.1306 19.7837C29.1495 19.7931 29.1684 19.7931 29.1874 19.8024H29.1969L29.0169 11.0169C29.0169 10.9702 29.0169 10.9329 29.0263 10.8862C28.9884 10.2513 28.7042 9.68181 28.2779 9.26167C28.2684 9.243 28.2495 9.23366 28.24 9.21499C27.9179 8.90689 27.5105 8.68282 27.0557 8.57078C26.8663 8.5241 26.6578 8.49609 26.4494 8.49609C26.4305 8.49609 26.4115 8.49609 26.3926 8.49609L19.7228 8.6268C20.2439 7.74918 20.5281 6.73152 20.5092 5.63916C20.4808 4.42544 20.0734 3.29574 19.4102 2.38077C19.2018 2.10068 18.9649 1.82993 18.7186 1.59652C17.7238 0.653545 16.388 0.0560182 14.929 0C14.8058 0 14.7205 0 14.6258 0Z'/>
                     </svg>
                     <p className={`${style.link_text} link-anime`}>{t('nav.works')}</p>
                  </NavLink>
               </li>
               <li className={style.skills}>
                  <NavLink to='/skills' activeClassName={style.active_link} onMouseEnter={animationSkills}>
                     <svg viewBox='0 0 32 33' xmlns='http://www.w3.org/2000/svg' id='skills_svg'>
                        <path
                           d='M28.6464 12.6734H27.9883C27.774 12.0042 27.5041 11.354 27.1812 10.7299L27.6474 10.2643C27.9125 9.99928 28.1229 9.68463 28.2664 9.33832C28.4099 8.99201 28.4837 8.62081 28.4837 8.24595C28.4837 7.87108 28.4099 7.49989 28.2664 7.15357C28.1229 6.80726 27.9125 6.49262 27.6474 6.22762L26.273 4.8526C26.0079 4.58753 25.6933 4.37726 25.347 4.2338C25.0007 4.09034 24.6295 4.01651 24.2547 4.01651C23.8798 4.01651 23.5086 4.09034 23.1623 4.2338C22.816 4.37726 22.5014 4.58753 22.2363 4.8526L21.7701 5.31941C21.1461 4.99609 20.4959 4.7259 19.8266 4.51172V3.85357C19.8258 3.09701 19.5249 2.37165 18.9899 1.83668C18.4549 1.3017 17.7296 1.0008 16.973 1H15.027C14.2704 1.0008 13.5451 1.3017 13.0101 1.83668C12.4751 2.37165 12.1742 3.09701 12.1734 3.85357V4.51172C11.5041 4.72571 10.8539 4.99569 10.2299 5.31881L9.76367 4.8526C9.49867 4.58745 9.18403 4.37712 8.83772 4.23362C8.4914 4.09012 8.12021 4.01626 7.74534 4.01626C7.37047 4.01626 6.99928 4.09012 6.65297 4.23362C6.30666 4.37712 5.99201 4.58745 5.72701 4.8526L4.3526 6.22762C4.08755 6.4926 3.87729 6.80721 3.73384 7.15347C3.59039 7.49973 3.51656 7.87085 3.51656 8.24564C3.51656 8.62044 3.59039 8.99156 3.73384 9.33782C3.87729 9.68408 4.08755 9.99868 4.3526 10.2637L4.81941 10.7299C4.49609 11.3539 4.2259 12.0041 4.01172 12.6734H3.35357C2.59701 12.6742 1.87165 12.9751 1.33668 13.5101C0.801702 14.0451 0.500801 14.7704 0.5 15.527V17.473C0.500961 18.2295 0.801913 18.9548 1.33685 19.4897C1.87179 20.0246 2.59705 20.3256 3.35357 20.3266H4.01172C4.22571 20.9959 4.49569 21.6461 4.81881 22.2701L4.3526 22.7363C4.08745 23.0013 3.87712 23.316 3.73362 23.6623C3.59012 24.0086 3.51626 24.3798 3.51626 24.7547C3.51626 25.1295 3.59012 25.5007 3.73362 25.847C3.87712 26.1933 4.08745 26.508 4.3526 26.773L5.72762 28.148C5.99266 28.4131 6.30731 28.6233 6.65362 28.7668C6.99993 28.9103 7.3711 28.9841 7.74595 28.9841C8.12079 28.9841 8.49197 28.9103 8.83827 28.7668C9.18458 28.6233 9.49924 28.4131 9.76428 28.148L10.2305 27.6812C10.8545 28.004 11.5044 28.274 12.1734 28.4883V29.1464C12.1744 29.9029 12.4754 30.6282 13.0103 31.1631C13.5452 31.6981 14.2705 31.999 15.027 32H16.973C17.7296 31.9992 18.4549 31.6983 18.9899 31.1633C19.5249 30.6283 19.8258 29.903 19.8266 29.1464V28.4883C20.496 28.2744 21.1461 28.0044 21.7701 27.6812L22.2363 28.1474C22.5013 28.4125 22.8159 28.6227 23.1622 28.7662C23.5084 28.9096 23.8796 28.9834 24.2544 28.9834C24.6291 28.9834 25.0003 28.9096 25.3465 28.7662C25.6928 28.6227 26.0074 28.4125 26.2724 28.1474L27.6474 26.7718C27.9125 26.5068 28.1227 26.1922 28.2662 25.8459C28.4096 25.4997 28.4834 25.1285 28.4834 24.7538C28.4834 24.379 28.4096 24.0078 28.2662 23.6616C28.1227 23.3153 27.9125 23.0007 27.6474 22.7357L27.1806 22.2689C27.504 21.6453 27.7742 20.9956 27.9883 20.3266H28.6464C29.4031 20.3256 30.1284 20.0246 30.6634 19.4895C31.1983 18.9544 31.4992 18.229 31.5 17.4724V15.527C31.4992 14.7704 31.1983 14.0451 30.6633 13.5101C30.1283 12.9751 29.403 12.6742 28.6464 12.6734ZM16 23.2449C14.666 23.2449 13.3619 22.8493 12.2527 22.1082C11.1435 21.3671 10.279 20.3136 9.7685 19.0812C9.258 17.8487 9.12443 16.4925 9.38468 15.1841C9.64493 13.8757 10.2873 12.6739 11.2306 11.7306C12.1739 10.7873 13.3757 10.1449 14.6841 9.88468C15.9925 9.62443 17.3487 9.758 18.5812 10.2685C19.8136 10.779 20.8671 11.6435 21.6082 12.7527C22.3493 13.8619 22.7449 15.166 22.7449 16.5C22.743 18.2883 22.0318 20.0028 20.7673 21.2673C19.5028 22.5318 17.7883 23.243 16 23.2449V23.2449Z'/>
                     </svg>
                     <p className={`${style.link_text} link-anime`}>{t('nav.skills')}</p>
                  </NavLink>
               </li>
               <li className={style.contact}>
                  <NavLink to='/contact' activeClassName={style.active_link} onMouseEnter={animationContact}>
                     <svg viewBox='0 -4 32 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path id='contact_path_one'
                              d='M30.5604 0.858492L23.4807 5.54717L16 10.5L8.51931 5.54717L1.43958 0.858492C1.63061 0.686961 1.86954 0.593633 2.11583 0.594341H29.8842C30.1305 0.593633 30.3694 0.686961 30.5604 0.858492V0.858492Z'/>
                        <path
                           d='M30.9614 1.78302V19.217C30.9606 19.532 30.8469 19.8338 30.645 20.0565C30.4432 20.2793 30.1697 20.4048 29.8842 20.4057H2.11586C1.8304 20.4048 1.55687 20.2793 1.35502 20.0565C1.15317 19.8338 1.03942 19.532 1.03864 19.217V1.78302C1.03873 1.60567 1.0748 1.43059 1.14418 1.27062C1.21356 1.11064 1.3145 0.969826 1.4396 0.85849L8.51933 5.54717L16 10.5L23.4807 5.54717L30.5605 0.85849C30.6856 0.969826 30.7865 1.11064 30.8559 1.27062C30.9253 1.43059 30.9613 1.60567 30.9614 1.78302V1.78302Z'/>
                     </svg>
                     <p className={`${style.link_text} link-anime`}>{t('nav.contact')}</p>
                  </NavLink>
               </li>
            </ul>
         </div>

         <div className={style.add_block_menu}>
            <Link to='' className={style.chat}>
               <div className={style.chat_logo}>
                  <svg viewBox='0 0 44 37' xmlns='http://www.w3.org/2000/svg'>
                     <path
                        d='M44 36.8372H18.3451C8.21296 36.8372 0 28.5913 0 18.4186C0 8.24587 8.21296 0 18.3451 0C18.4919 0 18.6443 0 18.791 0.00566726C19.1241 0.0113345 19.4571 0.0283363 19.7845 0.0566726C19.8466 0.0623399 19.903 0.0680071 19.9651 0.0736744C25.0679 0.521388 29.5723 3.06599 32.6148 6.84605C32.5583 6.91406 32.5019 6.98774 32.4511 7.05574C32.4341 7.07274 32.4228 7.09541 32.4059 7.11241C31.8753 7.81516 31.3899 8.55757 30.9609 9.33398C30.3908 8.5349 29.7416 7.78682 29.0304 7.11241C26.5581 4.75483 23.3124 3.21334 19.7167 2.89597C19.6603 2.8903 19.6095 2.88464 19.553 2.88464C19.1523 2.8563 18.7515 2.8393 18.3394 2.8393C9.77088 2.83363 2.82232 9.81003 2.82232 18.4186C2.82232 27.0272 9.77088 34.0036 18.3451 34.0036C22.4826 34.0036 26.242 32.3771 29.0248 29.7305C29.736 29.0504 30.3851 28.308 30.9609 27.5032C31.3955 28.2796 31.881 29.0277 32.4115 29.7305C32.4228 29.7475 32.4398 29.7645 32.4511 29.7815C32.5075 29.8551 32.5583 29.9231 32.6148 29.9912C35.3919 33.5219 39.4053 36.0268 44 36.8372Z'/>
                     <path
                        d='M29.894 25.2363C28.8385 27.0442 27.3709 28.5857 25.6267 29.7305C23.5325 31.1019 21.0319 31.901 18.3451 31.9067H18.3169C10.9111 31.9067 4.91083 25.8824 4.91083 18.4469C4.91083 11.0115 10.9111 4.98718 18.3169 4.98718H18.3451C18.8644 4.98718 19.3781 5.02119 19.8804 5.07786C19.9143 5.08353 19.9482 5.08353 19.9764 5.08919C20.6537 5.19687 21.1674 5.7806 21.1674 6.48901C21.1674 6.7157 21.1166 6.92539 21.0263 7.11241C20.7949 7.58279 20.3151 7.90582 19.7562 7.90582C19.7393 7.90582 19.7224 7.90582 19.7054 7.90582C19.6321 7.89449 19.553 7.88882 19.4797 7.87749C19.1184 7.83782 18.7459 7.82081 18.3733 7.82081H18.3451C12.5142 7.83782 7.7896 12.587 7.7896 18.4469C7.7896 24.3069 12.5142 29.056 18.3451 29.073H18.3733C23.4874 29.073 27.7547 25.429 28.7425 20.5892C28.9288 22.21 29.3239 23.7685 29.894 25.2363Z'/>
                  </svg>
                  <p className={style.logo_text}>Chat</p>
               </div>

               <p className={style.link_chat}>Ytrium.online</p>
            </Link>

            <div className={style.networks}>
               <Network link='' text='VKontakte' widthText={49} color='121, 160, 193' background='77, 113, 152'>
                  <svg viewBox="0 0 21 11" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M20.8122 9.81474C20.7548 9.7281 20.4062 9.03128 18.7288 7.59995C16.9695 6.10083 17.2073 6.34566 19.3235 3.75045C20.6153 2.17223 21.128 1.20797 20.968 0.793642C20.8163 0.401911 19.8648 0.503611 19.8648 0.503611L16.7111 0.518677C16.7111 0.518677 16.4773 0.488544 16.301 0.586477C16.1329 0.680642 16.0221 0.899107 16.0221 0.899107C16.0221 0.899107 15.5218 2.1195 14.8574 3.15909C13.4508 5.35127 12.8889 5.46804 12.6593 5.33244C12.1261 5.01604 12.2573 4.05555 12.2573 3.37755C12.2573 1.25317 12.6059 0.368012 11.5725 0.138247C11.228 0.062914 10.9778 0.0101811 10.1002 0.00264783C8.97239 -0.00865209 8.02094 0.00641447 7.4796 0.247479C7.1187 0.409445 6.84393 0.771042 7.01208 0.789875C7.22123 0.816241 7.69285 0.906641 7.94302 1.21927C8.267 1.6223 8.2547 2.53006 8.2547 2.53006C8.2547 2.53006 8.43925 5.03111 7.81999 5.34374C7.39348 5.55844 6.81112 5.12151 5.5562 3.13272C4.91643 2.11573 4.4284 0.98574 4.4284 0.98574C4.4284 0.98574 4.33408 0.774808 4.17004 0.665576C3.96908 0.529977 3.68611 0.484777 3.68611 0.484777L0.684127 0.499844C0.684127 0.499844 0.233009 0.511144 0.0689661 0.691942C-0.0786724 0.853908 0.0566629 1.18161 0.0566629 1.18161C0.0566629 1.18161 2.40658 6.2289 5.06407 8.77138C7.50421 11.1029 10.2724 10.9523 10.2724 10.9523H11.5274C11.5274 10.9523 11.9047 10.9146 12.1015 10.7225C12.282 10.5455 12.2737 10.2178 12.2737 10.2178C12.2737 10.2178 12.2491 8.66968 13.0324 8.44368C13.8034 8.21768 14.7918 9.93904 15.8417 10.5982C16.6332 11.0992 17.236 10.9899 17.236 10.9899L20.0412 10.9523C20.0412 10.9598 21.5094 10.8769 20.8122 9.81474Z"/>
                  </svg>
               </Network>

               <Network link='https://github.com/Ivan160' text='GitHub' widthText={34} color='85, 207, 150'
                        background='54, 186, 124'>
                  <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M10.5 0.5C4.70039 0.5 0 5.08989 0 10.7559C0 15.2847 3.00645 19.1286 7.17773 20.4819C7.70273 20.5797 7.89551 20.2618 7.89551 19.9887C7.89551 19.7441 7.8873 19.1 7.8832 18.244C4.96289 18.8636 4.34766 16.8703 4.34766 16.8703C3.87188 15.6882 3.17871 15.3703 3.17871 15.3703C2.22715 14.7344 3.25254 14.7466 3.25254 14.7466C4.30664 14.8159 4.86035 15.8023 4.86035 15.8023C5.79551 17.3717 7.31719 16.9152 7.92012 16.6543C8.01445 15.9898 8.28516 15.5415 8.58457 15.2847C6.25078 15.0278 3.80215 14.1474 3.80215 10.2178C3.80215 9.09686 4.2082 8.18378 4.88086 7.46635C4.76191 7.20547 4.40918 6.16602 4.97109 4.75155C4.97109 4.75155 5.84883 4.47844 7.85859 5.80323C8.69941 5.57496 9.58945 5.46083 10.4836 5.45675C11.3777 5.46083 12.2678 5.57496 13.1086 5.80323C15.102 4.47844 15.9838 4.75155 15.9838 4.75155C16.5498 6.16195 16.193 7.20547 16.0904 7.46635C16.759 8.18378 17.165 9.09686 17.165 10.2178C17.165 14.1555 14.7123 15.0238 12.3744 15.2765C12.7436 15.5863 13.084 16.214 13.084 17.172C13.084 18.5457 13.0717 19.6463 13.0717 19.9805C13.0717 20.2496 13.2562 20.5716 13.7936 20.4656C17.9936 19.1245 21 15.2806 21 10.7559C21 5.08989 16.2996 0.5 10.5 0.5Z"/>
                  </svg>
               </Network>

               <Network link='' copy='ivanandrosc@gmail.com' text='Gmail' widthText={30} color='255, 226, 41'
                        background='244, 212, 0'>
                  <svg viewBox="0 0 20 15" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M18 0H2C0.901961 0 0 0.841912 0 1.875V13.125C0 14.1544 0.901961 15 2 15H18C19.098 15 20 14.1544 20 13.125V1.875C20 0.841912 19.098 0 18 0ZM18 13.125H16V4.875L10 8.4375L4 4.875V13.125H2V1.875H3.2L10 5.8125L16.8 1.875H18V13.125Z"/>
                  </svg>
               </Network>

               <Network link='' text='HeadHunter' widthText={57} color='255, 51, 51' background='255, 1, 28'>
                  <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M10.5 0C4.70413 0 0 4.69992 0 10.5C0 16.3001 4.70413 21 10.5 21C16.3001 21 21 16.3043 21 10.5C21 4.69992 16.3001 0 10.5 0ZM10.0701 15.2083H8.35026V11.7055C8.35026 11.01 8.32076 10.5717 8.25331 10.382C8.18587 10.1923 8.07206 10.0448 7.90767 9.93517C7.74328 9.82557 7.53673 9.76656 7.28804 9.76656C7.0014 9.76656 6.74849 9.83822 6.52509 9.98153C6.29747 10.1248 6.13308 10.3356 6.03192 10.6222C5.92654 10.9089 5.87595 11.3304 5.87595 11.8868L5.87174 15.2083H4.15616V5.79165H5.87595V9.42935C6.42814 8.76756 7.09414 8.43878 7.8613 8.43878C8.25753 8.43878 8.6116 8.51465 8.93195 8.6664C9.25231 8.81393 9.48836 9.00783 9.65275 9.23966C9.81293 9.47571 9.92252 9.73284 9.98153 10.0153C10.0405 10.2977 10.0701 10.736 10.0701 11.3304V15.2083ZM16.8438 15.2083H15.124V11.7055C15.124 11.01 15.0903 10.5717 15.0271 10.382C14.9597 10.1923 14.8458 10.0448 14.6815 9.93517C14.5171 9.82557 14.3105 9.76656 14.0618 9.76656C13.7752 9.76656 13.5223 9.83822 13.2989 9.98153C13.0755 10.1248 12.9111 10.3356 12.8057 10.6222C12.7045 10.9089 12.6497 11.3304 12.6497 11.8868V15.2083H10.9299V5.79165H12.6497V9.42935C13.2019 8.76756 13.8679 8.43878 14.6351 8.43878C15.0313 8.43878 15.3854 8.51465 15.7057 8.6664C16.0219 8.81393 16.2621 9.00783 16.4223 9.23966C16.5867 9.47571 16.6963 9.73284 16.7553 10.0153C16.8143 10.2977 16.8438 10.736 16.8438 11.3304V15.2083Z"/>
                  </svg>
               </Network>
            </div>

            <div className={style.language_selection}>
                    <span onClick={() => changeLanguage('en')}
                          className={language === 'en' ? style.language_active : style.language_hidden}>EN</span>
               <span onClick={() => changeLanguage('ru')}
                     className={language === 'ru' ? style.language_active : style.language_hidden}>RU</span>
            </div>
         </div>

      </nav>
   );
};
export default Navbar;