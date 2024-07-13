import style from './AutoCorrectingWord.module.scss'
interface CorrectionProps{
  correction: string,
  onClick: (correction: string) => void
}

const AutoCorrectingWord:React.FC<CorrectionProps> = ({correction, onClick}) => {
  const setCorrection = () => {
    onClick(correction)
  }

  return (
    <div onClick={setCorrection} className={style.word}>
      {correction}
    </div>
  )
}

export default AutoCorrectingWord
