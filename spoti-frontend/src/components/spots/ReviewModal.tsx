"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";

type ReviewModalProps = {
  spotName: string;
};

const ratingOptions = ["Silent", "Quiet", "Moderate", "Loud"];

const qualityOptions = ["Poor", "Fair", "Good", "Strong"];

export function ReviewModal({ spotName }: ReviewModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [noise, setNoise] = useState("Quiet");
  const [wifi, setWifi] = useState("Strong");
  const [outlets, setOutlets] = useState("Available");
  const [crowding, setCrowding] = useState("Open");
  const [comment, setComment] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  function handleClose() {
    setIsOpen(false);
    setSubmitted(false);
  }

  return (
    <>
      <button
        className="ui-button ui-button-secondary"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Rate this spot
      </button>

      {isOpen && (
        <div className="modal-backdrop" role="presentation">
          <div
            aria-labelledby="review-modal-title"
            aria-modal="true"
            className="review-modal"
            role="dialog"
          >
            <div className="review-modal-header">
              <div>
                <p className="eyebrow">Share an update</p>

                <h2 id="review-modal-title">
                  Rate {spotName}
                </h2>
              </div>

              <button
                className="icon-button"
                aria-label="Close review form"
                onClick={handleClose}
                type="button"
              >
                <X size={17} />
              </button>
            </div>

            {submitted ? (
              <div className="review-success">
                <div className="review-success-icon">
                  <Check size={22} />
                </div>

                <h3>Thanks for helping other students.</h3>

                <p>
                  Your review has been recorded for this prototype.
                </p>

                <button
                  className="ui-button ui-button-primary"
                  onClick={handleClose}
                  type="button"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                className="review-form"
                onSubmit={handleSubmit}
              >
                <label className="review-field">
                  <span>Noise level</span>

                  <select
                    value={noise}
                    onChange={(event) => setNoise(event.target.value)}
                  >
                    {ratingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="review-field">
                  <span>Wi-Fi quality</span>

                  <select
                    value={wifi}
                    onChange={(event) => setWifi(event.target.value)}
                  >
                    {qualityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="review-field">
                  <span>Outlet availability</span>

                  <select
                    value={outlets}
                    onChange={(event) => setOutlets(event.target.value)}
                  >
                    <option value="Available">Available</option>
                    <option value="Limited">Limited</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </label>

                <label className="review-field">
                  <span>Current crowding</span>

                  <select
                    value={crowding}
                    onChange={(event) => setCrowding(event.target.value)}
                  >
                    <option value="Open">Open</option>
                    <option value="Filling up">Filling up</option>
                    <option value="Busy">Busy</option>
                  </select>
                </label>

                <label className="review-field review-comment-field">
                  <span>Short comment</span>

                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="What should other students know?"
                    rows={4}
                  />
                </label>

                <div className="review-form-actions">
                  <button
                    className="ui-button ui-button-ghost"
                    onClick={handleClose}
                    type="button"
                  >
                    Cancel
                  </button>

                  <button
                    className="ui-button ui-button-primary"
                    type="submit"
                  >
                    Submit review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
