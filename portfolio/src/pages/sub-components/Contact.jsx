import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Spinner } from "flowbite-react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <div className="overflow-x-hidden">
      <div className="relative mb-12">
        <h1
          className=" hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold "
          style={{ background: "hsl(222.2 84% 4.9%)" }}
        >
          Contact
          <span className="text-tubeLight-effect font-extrabold">Me</span>
        </h1>
        <span
          className="absolute w-full h-1 top-7 smtop7
         md:top-8 lg:top-11 z-[-1] bg-slate-200"
        ></span>
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-1.5">
          <Label className="text-xl">Your Name</Label>
          <Input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Your Name"
          />
        </div>
        <div className="flex flex-col gap-2 px-1.5">
          <Label className="text-xl">Subject</Label>
          <Input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
          />
        </div>
        <div className="flex flex-col gap-2 px-1.5">
          <Label className="text-xl">Message</Label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
          />
        </div>
        <div className="flex justify-end">
          {!loading ? (
            <Button type='submit' className="w-full sm:w-52">Send Message</Button>
          ) : (
            <div className="flex flex-row gap-3">
              <Button>
                <Spinner aria-label="Spinner button example" size="sm" />
                <span className="pl-3">Sending...</span>
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Contact;
