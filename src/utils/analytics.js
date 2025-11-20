import ReactGA from "react-ga4";

// GA4 초기화 (실제 사용 시 환경변수로 관리하세요)
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID || "G-XXXXXXX";

export const initGA = () => {
  // GA 초기화 (프로덕션 환경에서만)
  if (process.env.NODE_ENV === 'production' && GA_MEASUREMENT_ID !== "G-XXXXXXX") {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("GA4 initialized");
  } else {
    console.log("GA4 in development mode - events will be logged only");
  }
};

// 페이지뷰 트래킹
export const trackPageView = (page) => {
  if (process.env.NODE_ENV === 'production') {
    ReactGA.send({ hitType: "pageview", page });
  }
  console.log("Page View:", page);
};

// 이벤트 트래킹
export const trackEvent = (category, action, label = null) => {
  const eventData = {
    category,
    action,
    label,
  };

  if (process.env.NODE_ENV === 'production') {
    ReactGA.event(eventData);
  }
  console.log("Event:", eventData);
};

// 특정 이벤트 트래킹 함수들
export const trackStartClick = () => {
  trackEvent("user_action", "start_click", "Start Test");
};

export const trackNextQuestion = (questionNumber) => {
  trackEvent("user_action", "next_question", `Question ${questionNumber}`);
};

export const trackResultView = (grade) => {
  trackEvent("user_action", "result_view", grade);
};

export const trackShareClick = (platform) => {
  trackEvent("user_action", "share_click", platform);
};

export const trackBannerClick = (bannerName) => {
  trackEvent("user_action", "banner_click", bannerName);
};
