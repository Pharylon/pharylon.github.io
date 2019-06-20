/* cSpell:disable */
// tslint:disable-next-line:max-line-length
const applicationServerPublicKey = "BCrbdi409kTD9W-Gy4abAetgU-zvCF2mX5CsiBFPSHqNfsn0fzbC5ttWw-RLdHmaiYxwzxuF2nT0MXhhwvEoKVA";
/* cSpell:enable */
let swRegistration;
export const subscribeUser = async () => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    if (!swRegistration) {
        return;
    }
    try {
        const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey,
        });
        const isSubscribed = await swRegistration.pushManager.getSubscription();
        if (!isSubscribed) {
            updateSubscriptionOnServer(subscription);
        }
        else {
            updateSubscriptionOnServer(subscription);
            console.log("User is already subscribed");
        }
    }
    catch (err) {
        console.log("Failed to subscribe the user: ", err);
    }
};
document.addEventListener("DOMContentLoaded", () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
        console.log("Service Worker and Push is supported");
        navigator.serviceWorker.register("./js/sw.js")
            .then((swReg) => {
            console.log("Service Worker is registered", swReg);
            swRegistration = swReg;
            subscribeUser();
            if (swReg.update) {
                console.log("Updating Service Working");
                swReg.update();
            }
        })
            .catch((error) => {
            console.error("Service Worker Error", error);
        });
    }
});
function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
async function updateSubscriptionOnServer(subscription) {
    const myJson = JSON.stringify(subscription);
    console.log("Got subscription", myJson);
    const response = await fetch("http://localhost:7071/api/Subscribe", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referer",
        body: myJson,
    });
    if (response.status !== 200) {
        console.log("ERROR subscribing user!", response);
    }
    else {
        console.log("Subscription OK");
    }
}
