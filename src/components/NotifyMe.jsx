import React, { useState } from "react";

const NotifyMe = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success | error

    const handleNotify = async () => {
        if (!email) return alert("Please enter your email.");

        setStatus("loading");
        try {
            // Example API call
            const response = await fetch("https://example.com/api/notify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error("Failed to send");

            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 3000); // reset after 3 sec
        } catch (error) {
            console.error(error);
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <div className="flex flex-col items-center !rounded-xl justify-center gap-1  p-4 !w-full border !border-[var(--border)] h-[50rem] text-[var-(--text)]">
        <div className="flex flex-col items-center gap-1 p-4 w-full max-w-md mx-auto ">
            <h4 className='!text-[var(--text)] !font-bold'>Coming Soon!</h4>
            <p className='!text-[var(--text)]'>Are you interested? Please provide your email address to be notified when this feature launches.</p>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control w-full md:flex-1 border !border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-14 bg-[var(--bg)]"
            />
            <button
                onClick={handleNotify}
                disabled={status === "loading"}
                className="px-4 py-2  w-full mt-1 !rounded-lg text-white bg-[var(--primary)] text-14 hover:opacity-90 disabled:opacity-50"
            >
                {status === "loading" ? "Sending..." : "Notify Me"}
            </button>

            {status === "success" && (
                <p className="text-green-500 text-12 mt-2 md:mt-0">You’ll be notified!</p>
            )}
            {status === "error" && (
                <p className="text-red-500 text-12 mt-2 md:mt-0">Something went wrong!</p>
            )}
        </div>

        </div>
    );
};

export default NotifyMe;
