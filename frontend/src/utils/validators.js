export function validateAd(form) {
  const errors = {};

  // Campaign Name
  if (!form.campaignName || form.campaignName.length < 3) {
    errors.campaignName = "Campaign name must be at least 3 characters.";
  }

  // Ad Text
  if (!form.adText) {
    errors.adText = "Ad text is required.";
  } else if (form.adText.length > 100) {
    errors.adText = "Ad text must be less than 100 characters.";
  }

  // CTA
  if (!form.cta) {
    errors.cta = "CTA is required.";
  }

  // Music Logic (IMPORTANT PART 🔥)
  if (form.musicOption === "existing" && !form.musicId) {
    errors.music = "Music ID is required for existing music.";
  }

  if (form.musicOption === "none" && form.objective === "Conversions") {
    errors.music = "Music is required when objective is Conversions.";
  }

  return errors;
}
