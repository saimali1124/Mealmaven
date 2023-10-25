import m from '../images/m.png';
import schedule from 'node-schedule';

function showNotification(title, message, url) {
  if (Notification.permission !== "denied" && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body: message,
      icon: m,
      name: 'MealMaven'
    });
    notification.onclick = function () {
      window.open(url);
    };
  }
}

export function setNotification(){
    //cron jobs for meal reminders
    schedule.scheduleJob('0 8 * * *', function () {
      showNotification('Reminder', 'It\'s time for BREAKFAST!', "images/logo.png", "http://localhost:3000/UserDietPlan");
    });
    
    schedule.scheduleJob('0 14 * * *', function () {
      showNotification('Reminder', 'It\'s time for LUNCH!', "images/logo.png", "http://localhost:3000/UserDietPlan");
    });
    
    schedule.scheduleJob('33 22 * * *', function () {
      showNotification('Reminder', 'It\'s time for DINNER!', "images/logo.png", "http://localhost:3000/UserDietPlan");
    });
} 