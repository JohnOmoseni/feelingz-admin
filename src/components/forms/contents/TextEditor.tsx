import MDEditor from "@uiw/react-md-editor";

export default function TextEditor({ value, onChange }: any) {
	return (
		<div className="container">
			<MDEditor value={value} onChange={onChange} />
			{/* <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} /> */}
		</div>
	);
}
