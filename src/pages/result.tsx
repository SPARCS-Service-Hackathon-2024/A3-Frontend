import Layout from "../components/layout";
import { useUser } from "../store/useUser";

// Helper function to split text into chunks of up to 2 sentences
function splitTextIntoChunks(text: string) {
  const sentences: string[] = text.match(/[^.!?]+[.!?]+/g) || [];
  const chunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    chunks.push(sentences.slice(i, i + 2).join(" "));
  }
  return chunks;
}

export default function Main() {
  const { user } = useUser();

  const output = [
    { speaker: "ai", text: "가장 기억에 남는 일은 무엇인가요?" },
    {
      speaker: "user",
      text: "첫째 아이가 태어난 날은 저에게 깊이 각인된 순간입니다. 와이프가 아이를 낳은 후, 아이를 처음 본 그 순간은 말로 표현할 수 없을 만큼 감동적이었습니다. 또한, 결형식 날도 잊을 수 없는 날입니다. 사랑하는 모든 사람들이 우리를 축복해주러 왔고, 그들과 함께 즐기는 시간은 무척이나 행복했습니다. 아이들과 함께한 첫 가족 여행도 매우 소중한 추억입니다. 해변에서 놀고, 저녁에 바베큐를 하는 등의 시간들이 특히 인상 깊었습니다. 그러나 그 중에서도 아이들이 해변에서 처음으로 파도를 만끽하는 모습을 보는 것이 가장 기억에 남습니다. 그들의 웃음소리는 지금도 귀에 생생하게 들립니다.",
    },
  ];

  // Inline styles for book page effects
  const bookPageStyle = {
    background:
      'url("https://img.freepik.com/premium-vector/white-gray-background-with-soft-watercolor-texture_34396-342.jpg")', // Replace with your paper texture image path
    color: "#5a4b33", // Adjust the text color to match an ink-like appearance
    padding: "2rem",
    marginTop: "2rem",
    marginBottom: "2rem",
    borderRadius: "8px", // Optional: adds rounded corners to your "page"
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Optional: adds a subtle shadow for depth
  };

  const textStyle = {
    borderBottom: "1px solid #ccc", // Simulates the line under text
    paddingBottom: "1rem", // Space between text and line
    marginBottom: "2rem", // Space between text blocks
  };

  return (
    <Layout>
      <div
        className="flex h-full w-full flex-col items-center pt-16 text-2xl"
        style={bookPageStyle}
      >
        {output.map((item, index) => (
          <div key={index} style={textStyle}>
            {item.speaker === "ai" ? (
              <div className="mb-4 mt-8 text-left text-2xl font-bold">
                {item.text}
              </div>
            ) : (
              splitTextIntoChunks(item.text).map((chunk, chunkIndex) => (
                <div key={chunkIndex} className="mb-8 mt-8 text-center text-xl">
                  {chunk}
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}
