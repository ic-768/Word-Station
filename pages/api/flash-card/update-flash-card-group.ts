import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "lib/supabaseClient";

type Data = {
  groupName: string;
  word: string;
};

const saveFlashCardGroup = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) => {
  try {
    const data = req.body;
    const { id, groupName, word } = data;

    // Check to see if word already saved by user
    const { data: existingRecord, error } = await supabase
      .from("flash_cards")
      .select("*")
      .eq("id", id)
      .single();

    console.log("existing", existingRecord);

    if (existingRecord) {
      // Update the existing record with the new groupName
      const { data: updatedRecord, error: updateError } = await supabase
        .from("flash_cards")
        .update({ group: groupName })
        .eq("id", id);
      console.log("updated", updatedRecord);

      if (updatedRecord) {
        res.status(200).json(updatedRecord);
      } else {
        res.status(500).send("Failed to update record");
      }
    } else {
      res.status(404).send("Record not found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

export default saveFlashCardGroup;
