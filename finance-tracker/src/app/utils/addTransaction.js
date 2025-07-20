export const addTransaction = async (formData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/add-transactions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    console.log(JSON.stringify(formData, null, 2));

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to add transaction:", error);
    return { error: error.message };
  }
};
