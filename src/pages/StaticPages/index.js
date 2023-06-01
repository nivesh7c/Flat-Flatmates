import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { getStaticPageRequest } from "../../apis/baseApi";

function StaticPages({match}) {
  const [content, setContent] = useState("");
  const alert = useAlert();
  const { params: { token } } = match;
    
  useEffect(() => {
    if(token){
    getStaticPageRequest(token).then(res => {
        if(res?.data?.content)
            setContent(res?.data?.content);
        else{
          setContent("");
            // alert.error("Something went wrong");
        }
    }).catch(err => {
      setContent("");
        // alert.error("Something went wrong!");
    })
}
  }, [token])

  return (
    <>
      <div dangerouslySetInnerHTML={{__html : content }} /> 
    </>
  );
}
export default StaticPages;
