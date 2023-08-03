import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const Search = ({ marginBottom }) => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <StyledSearchContainer marginBottom={marginBottom}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name='q'
          placeholder='请输入商品...'
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type='submit'>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
  </StyledSearchContainer>
  )
}

export default Search

const StyledSearchContainer = styled.div`
  form {
    display: flex;
    width: 100%;
    margin-bottom: ${props => props.marginBottom}px;
  input {
    flex: 1;
    height: 40px;
    border: 3px solid #e1251b;
    padding-left: 10px;
    &:focus {
      outline: 0;
    }
  }
  button {
    cursor: pointer;
    width: 40px;
    background-color: #e1251b;
    border: 0;
    &:hover {
      background-color: #c81623;
    }
    i {
      font-size: 16px;
      color: #fff;
    }
  }
  }
  
`