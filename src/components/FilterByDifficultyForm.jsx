export default function FilterByDifficultyForm({ difficulty, onChange }) {
  return (
    <form id="filter-form">
      <select
        name="filter-by-difficulty"
        id="filter-by-difficulty"
        value={difficulty}
        onChange={onChange}
      >
        <option value="">Select a difficulty...</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </form>
  );
}
