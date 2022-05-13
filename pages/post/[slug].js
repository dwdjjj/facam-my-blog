import SanityService from "../../services/SanityService";

export default function PostAll({ slug, post }) {
  console.log(post);
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const posts = await new SanityService().getPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths, //[{params: {slug: 'my-blog-test'}}]
    fallback: false,
  };
}

// paths만큼의 static 페이지 생김. 데이터를 가져다 컴포넌트에 넣어주기
export async function getStaticProps({ params }) {
  const { slug } = params;
  const posts = await new SanityService().getPosts();

  const post = posts.find((p) => p.slug == slug);

  return {
    props: {
      slug, // PostAll의 props로 들어감
      post,
    },
  };
}
