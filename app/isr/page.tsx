// app/isr/page.tsx

export const revalidate = 60; // seconds

async function getData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error("Fetch failed");
    }

    return res.json();
  } catch (error) {
    console.error("ISR fetch failed:", error);
    return []; // fallback
  }
}

export default async function ISRPage() {
  const data = await getData();

  return (
    <main>
      <h1>ISR Page</h1>
      <p>Last regenerated: {new Date().toLocaleTimeString()}</p>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
